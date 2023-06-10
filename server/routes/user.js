const express = require('express');
const User = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../controller/user');
const dotenv = require('dotenv');

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

async function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    try {
      var decoded = jwt.verify(token, SECRET_KEY);
      req.user = {
        _id: decoded.id,
      }
      console.log("hehehhe")
      next(req, res) //return req that contains user
    }
    catch(err){
      res.send('Invalid token!');
    }
}

router.post('/login', userController.logIn);

router.post('/signup', userController.signUp);

//update user information
router.put('/update', verifyToken, userController.update);

module.exports = router;