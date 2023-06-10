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

    const user = await User.findOne({email}).lean();

    if (user){
        res.send('Email already exists');
        return;
    }
    const isPassValid = validatePass(password, confirmed_password);
    switch (isPassValid){
        case 0:
            res.send('Password must have at least 8 characters');
            return;
        case 1:
            res.send('Password must contain at least 1 special character (*+?^$...)');
            return;
        case 2:
            res.send('Password does not match');
            return;
        default: //successful sign up
            const newUser = {
                email: email,
                password: await bcrypt.hash(password, HASH_ROUNDS),
                name: email.substring(0, email.indexOf('@'))
            }
            await User.create(newUser);
            res.send("Sign up successful!")
            return;
    }
}

module.exports.logIn = async function(req, res, next){
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({email: email});
        
        if (!user){
            res.send('User does not exist');
            return;
        }
        const match = await bcrypt.compare(password, user.password);
        
        if (match){
            var userToken = jwt.sign({id: user._id, email: user.email}, SECRET_KEY, { expiresIn: '2h'});

            res.cookie('token', userToken, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true});
            res.send({message: 'Log in successfully!', token: userToken});
            return;
        }
        res.send('Email or password is incorrect.');
        return;
    }
    catch (error){
        return {status: 'error', error: 'timed out'};
    }
}

module.exports.update = async function(req, res, next){
    const user = await User.findById({_id: req.user._id}); //req.user sent from verifyToken
    
    console.log(111111111111111);
    if (user.email !== req.body.email){
      res.send('Email can not be updated.');
      return;
    }
    await User.updateOne({_id: user.id}, req.body);
    res.send({message: 'Update successfully'});
}
