const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const mailer = require('../utils/mailer');
const botConfig = require('../config/chatbot.config');
const appConfig = require('../config/app.config');
const HASH_ROUNDS = 8;

dotenv.config();

const SECRET_KEY = botConfig.SECRET_KEY;

const validatePass = ((pass, repass) => {
    /*
        0: length < 8
        1: not contain special character
        2: pass and pass confirmed not same
        3: successful
     */
    const special = /\W/;
    if (pass.length < 8){
        return 0;
    }
    else if (!special.test(pass)){
        return 1;
    }
    else if (pass !== repass){
        return 2;
    }
    return 3;
});

const sendEmailSignUp = async (email) => {
    const hashedEmail = await bcrypt.hash(email, HASH_ROUNDS);
    const encodedEmail = Buffer.from(hashedEmail).toString('base64');

    await mailer.sendMail(
        email, 
        "Verify Email", 
        `Click this 
        <a href="${appConfig.APP_URL}/auth/verify/${email}/${encodedEmail}">link</a>
        to verify your account.
        `
    );
}

const sendEmailUpdate = async (email) => {    
    const hashedEmail = await bcrypt.hash(email, HASH_ROUNDS);
    const encodedEmail = Buffer.from(hashedEmail).toString('base64');

    await mailer.sendMail(
        email, 
        "Reset Password", 
        `Click this 
        <a href="${appConfig.APP_URL}/auth/reset/${email}/${encodedEmail}}">link</a>
        to reset your password.
        `
    );
}

module.exports.signUp = async function(req, res, next){
    const email = req.body.email;
    const password = req.body.password;
    const confirmed_password = req.body.confirmed_password;

    if (email == undefined || password == undefined || confirmed_password == undefined){
        res.status(500).send( {message: 'Please fill in all fields'} );
        return;
    }

    const user = await User.findOne({email}).lean();

    if (user){
        res.status(500).send( {message: 'Email already exists'} );
        return;
    }
    const isPassValid = validatePass(password, confirmed_password);
    switch (isPassValid){
        case 0:
            res.status(500).send( {message: 'Password must have at least 8 characters'} );
            return;
        case 1:
            res.status(500).send( {message: 'Password must contain at least 1 special character (*+?^$...)'} );
            return;
        case 2:
            res.status(500).send( {message: 'Password does not match'} );
            return;
        default:
            try {
                const hashedPassword = await bcrypt.hash(password, HASH_ROUNDS);

                const newUser = {
                    email: email,
                    password: hashedPassword,
                    name: email.substring(0, email.indexOf('@')),
                    isVerified: false
                }
                await User.create(newUser);

                await sendEmailSignUp(email);
                res.status(401).send( {message: 'An email has been sent to you'} );
                return;
            }
            catch (error){
                console.log('SIGN UP:', '\n', error);
                res.status(500).send( {message: 'An error has occurred'} );
            }
    }
}

module.exports.logIn = async function(req, res, next){
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (email == undefined || password == undefined){
            res.status(500).send( {message: 'Please fill in all fields'} );
            return;
        }

        const user = await User.findOne( {email: email} );
        
        if (!user){
            res.status(500).send( {message: 'User does not exist'} );
            return;
        }

        if (!user.isVerified){
            res.status(500).send( {message: 'Your account is not verified'} );
            return;
        }

        const match = await bcrypt.compare(password, user.password);
        if (match){
            var userToken = jwt.sign( {id: user._id, email: user.email}, SECRET_KEY, { expiresIn: '2h'} );

            res.status(200).send( {message: 'Log in successfully!', token: userToken, name: user.name} );
            return;
        }
        res.status(500).send( {message: 'Email or password is incorrect'} );
        return;
    }
    catch (error){
        console.log('LOG IN:', '\n', error);
        res.status(500).send( {message: 'An error has occurred'} );
    }
}

//when forgot password
module.exports.updatePassword = async function(req, res, next){
    const email = req.body.email;
    const password = req.body.password;
    const confirmed_password = req.body.confirmed_password;

    if (email == undefined || password == undefined || confirmed_password == undefined){
        res.status(500).send( {message: 'Please fill in all fields'} );
        return;
    }

    try {
        const user = await User.findOne({email}).lean();
        if (!user){
            res.status(500).send( {message: 'Email does not exist'} );
            return;
        }
        const isPassValid = validatePass(password, confirmed_password);
        switch (isPassValid){
            case 0:
                res.status(500).send( {message: 'Password must have at least 8 characters'} );
                return;
            case 1:
                res.status(500).send( {message: 'Password must contain at least 1 special character (*+?^$...)'} );
                return;
            case 2:
                res.status(500).send( {message: 'Password does not match'} );
                return;
            default: //successful sign up
                const hashedPassword = await bcrypt.hash(password, HASH_ROUNDS);

                user.password = hashedPassword;
                user.isVerified = false;

                await sendEmailUpdate(email);
                res.status(401).send( {message: 'An email has been sent to you'} );
                return;
        }
    }
    catch (error){
        console.log('UPDATE PASSWORD:', '\n', error);
        res.status(500).send( {message: 'An error has occurred'} );
    }    
}

//after clicking the link sent, password is reset
module.exports.resetPassword = async function (req, res) {
    const email = req.params.email;
    const encodedEmail = req.params.encodedEmail;
    const hashedEmail = Buffer.from(encodedEmail, 'base64').toString('ascii');
        
    await bcrypt.compare(email, hashedEmail, async (err, result) => {
        if (result == true){
            try{
                const user = await User.findOne( {email: email} );
                user.isVerified = true;
                await User.updateOne( {email: email}, user);

                res.status(200).send( {message: 'Email verified successfully. Please sign in to continue'} );
            }
            catch (error){
                console.log('UPDATE PASSWORD: ', '\n', error);
                res.status(500).send( {message: 'An error has occurred'} );
            }
        }
        else{
            res.status(500).send( {message: 'Invalid link'} );
        }
    });
}

module.exports.verify = async function (req, res) {
    const email = req.params.email;
    const encodedEmail = req.params.encodedEmail;
    const hashedEmail = Buffer.from(encodedEmail, 'base64').toString('ascii');
        
    await bcrypt.compare(email, hashedEmail, async (err, result) => {
        if (result == true){
            try{
                const user = await User.findOne( {email: email} );
                user.isVerified = true;
                await User.updateOne( {email: email}, user);

                res.status(200).send( {message: 'Email verified successfully. Please sign in to continue'} );
            }
            catch (error){
                console.log('VERIFY: ', '\n', error);
                res.status(500).send( {message: 'An error has occurred'} );
            }
        }
        else{
            res.status(500).send( {message: 'Invalid link'} );
        }
    });
}

//for user to update profile
// module.exports.updateProfile = async function(req, res, next){
//     const user = await User.findById( {_id: req.user._id} ); //req.user sent from verifyToken
    
//     const change = req.body;
//     if (change.email == undefined){
//         change.email = user.email;
//     }
    
//     console.log(change);
//     if (user.email !== change.email){
//       res.status(500).send( {message: 'Invalid email.'} );
//       return;
//     }
//     await User.updateOne( {_id: user.id}, change);
//     res.status(500).send( {message: 'Update successfully'} );
// }