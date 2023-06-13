const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../controller/user');
const dotenv = require('dotenv');

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    try {
      var decoded = jwt.verify(token, SECRET_KEY);
      req.user = {
        _id: decoded.id,
      }
      next(); //return req that contains user with id
    }
    catch(err){
      res.send('Invalid token!');
    }
}

router.post('/login', userController.logIn);

router.post('/signup', userController.signUp);

//update user information in user profile -> need to verify token
router.put('/update/profile', verifyToken, userController.updateProfile);

//update when forgetting password
router.put('/update/password', userController.updatePassword);

module.exports = router;