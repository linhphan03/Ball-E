const express = require('express');
const User = require('../models/user');
const UserToken = require('../models/user_token');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/user');
const dotenv = require('dotenv');

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

async function verifyToken(req, res, next) {
    const token = req.headers.authorization;
  
    try {
      var decoded = jwt.verify(token, SECRET_KEY); //if valid, return object input at line 145 -> Lấy user id từ đó
      //TODO
      req.user = {
        id: decoded.user_id,
      }
      next(req, res)
    }
    catch(err){
      res.send('Invalid token!');
    }
}

router.post('/login', userController.logIn);

router.post('/signup', userController.signUp);

//update user information
router.put('/update', verifyToken, async function(req, res, next){
    const token = req.headers.authorization;

    
});
