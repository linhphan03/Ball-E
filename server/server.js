const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRouter = require('./routes/user');
const chatbotRouter = require('./routes/chatbot');

const server = express();

const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/GPT"

server.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next()
});

server.use(cors());
server.use(express.json());
server.use('/auth', userRouter);
server.use('/', chatbotRouter);

//start http server for our application to listen for incoming requests
//5000: port number that server will listen on
server.listen(5000, () => console.log('AI server started on http://localhost:5000'));

mongoose.connect(DB_URL)
.then(() => console.log('Connected'));
