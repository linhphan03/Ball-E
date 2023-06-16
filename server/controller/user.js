const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const HASH_ROUNDS = 8;

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

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

module.exports.signUp = async function(req, res, next){
    const email = req.body.email;
    const password = req.body.password;
    const confirmed_password = req.body.confirmed_password;

    if (email == undefined || password == undefined || confirmed_password == undefined){
        res.status(500).send( {message: 'Please fill in all fields'} );
        return;
    }
    console.log(email, password);

    const user = await User.findOne({email}).lean();

    if (user){
        res.status(500).send('Email already exists');
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
            const newUser = {
                email: email,
                password: await bcrypt.hash(password, HASH_ROUNDS),
                name: email.substring(0, email.indexOf('@'))
            }
            await User.create(newUser);
            res.status(200).send( {message:"Sign up successful!"} );
            return;
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

        const user = await User.findOne({email: email});
        console.log(user);
        if (!user){
            res.status(500).send({message: 'User does not exist'});
            return;
        }
        const match = await bcrypt.compare(password, user.password);
        console.log(match)
        if (match){
            var userToken = jwt.sign({id: user._id, email: user.email}, SECRET_KEY, { expiresIn: '2h'});

            //res.cookie('token', userToken, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true});
            res.status(200).send( {message: 'Log in successfully!', token: userToken, name: user.name} );
            return;
        }
        res.status(500).send( {message: 'Email or password is incorrect.'} );
        return;
    }
    catch (error){
        return {status: 'error', error: 'timed out'};
    }
}

//for user to update profile
module.exports.updateProfile = async function(req, res, next){
    const user = await User.findById({_id: req.user._id}); //req.user sent from verifyToken
    
    const change = req.body;
    if (change.email == undefined){
        change.email = user.email;
    }
    
    console.log(change);
    if (user.email !== change.email){
      res.status(500).send( {message: 'Invalid email.'} );
      return;
    }
    await User.updateOne({_id: user.id}, change);
    res.status(500).send( {message: 'Update successfully'} );
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
            const passwordUpdate = {
                password: await bcrypt.hash(password, HASH_ROUNDS),
            }
            await User.updateOne({email: email}, passwordUpdate);
            res.status(200).send( {message:"Your password has been updated."} );
            return;
    }    
}
