const User = require('../models/user')
const bcrypt = require('bcrypt');
const HASH_ROUNDS = 8;

const validatePass = ((pass, repass) => {
    /*
        0: length < 8
        1: not contain special character
        2: pass and pass confirmed not same
        3: successful
     */
    const special = /\W/;
    if (password.length < 8){
        return 0;
    }
    else if (!special.test(password)){
        return 1;
    }
    else if (pass !== repass){
        return 2;
    }
    return 3;
});

const isEmailExist = (email => {User.findOne({email: email})});

module.exports.signUp = async function(req, res, next){
    const email = req.body.email;
    const password = req.body.password;
    const confirmed_password = req.body.confirmed_password;

    if (await isEmailExist(email)){
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
            return;
    }
}

module.exports.logIn = async function(req, res, next){
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({email: email});

    if (!user){
        res.send('Email does not exist');
        return;
    }
    
    const match = await bcrypt.compare(password, user.password);
    if (match){
        res.send('Log in successfully!');
        return;
    }
}