const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { Configuration, OpenAIApi } = require('openai');

const userRouter = require('./routes/user');

dotenv.config(); //Loads .env file contents into process.env.
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, //required to authenticate request to openAI API
});

//new instance for openAI API class using Configuration object
const openai = new OpenAIApi(configuration); //make request through OpenAI API (generate text, complete prompts with GPT3...)

const app = express(); //define routes, middleware and other settings for application

app.use(cors());
app.use(express.json());
app.use('/user', userRouter);

//GET route: handle get request to root of URL after /
app.get('/', async (req, res) => { //same as function(req, res){}
    res.status(200).send({ 
        message: "Welcome"
    })
});

app.post('/', async (req, res) => {
    try{
        //in this case, req.body contains text input as input for OpenAI API
        const prompt = req.body.prompt;
        console.log('Prompt property: ', prompt);

        //make asynchronous call to create completion of openAI API -> must wait for response before proceeding
        const response = await openai.createCompletion({ 
            model: "text-davinci-002",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 64,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        res.status(200).send({
            //RESPONSE: object returned by openAI API, assumed to have DATA property which contains array of CHOICES 
            //in this case, only have 1 element in that array -> choose CHOICES[0]
            //CHOICES: array of object represent possible completion of input prompt
            bot: response.data.choices[0].text
        });
    }
    catch (error){ 
        console.log(error);
        res.status(500).send({ error });
    }
})

//start http server for our application to listen for incoming requests
//5000: port number that server will listen on
app.listen(5000, () => console.log('AI server started on http://localhost:5000'));

mongoose.connect("mongodb://127.0.0.1:27017/GPT_Users")
.then(() => console.log('Database GPT_Users connected!!'));