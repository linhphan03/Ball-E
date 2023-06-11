const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRouter = require('./routes/user');
const chatbotRouter = require('./routes/chatbot');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/user', userRouter);
app.use('/', chatbotRouter);

//start http server for our application to listen for incoming requests
//5000: port number that server will listen on
app.listen(5000, () => console.log('AI server started on http://localhost:5000'));

mongoose.connect("mongodb://127.0.0.1:27017/GPT_Users")
.then(() => console.log('Database GPT_Users connected!!'));