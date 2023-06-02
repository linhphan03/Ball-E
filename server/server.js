import express from "express";
import * as dotenv from "dotenv"; //load environment variables from file -> store sensitive info
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

//load envir variables from env file and add them to process envir
dotenv.config(); //Loads .env file contents into process.env.

//new instance for Configuration class
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, //required to authenticate request to openAI API
});

//new instance for openAI API class using Configuration object
const openai = new OpenAIApi(configuration); //make request through OpenAI API (generate text, complete prompts with GPT3...)

//new instance of Express application framework & assign to variable app
const app = express(); //define routes, middleware and other settings for application

//first middleware: cors
app.use(cors());
//second middleware: built-in express .json middleware -> parse incoming request with JSON payloads
app.use(express.json());

//GET route: handle get request to root of URL after /
//set request status to 200, then send a message to client
app.get('/', async (req, res) => { //same as function(req, res){}
    res.status(200).send({ 
        message: "Welcome"
    })
});

//POST route:
app.post('/', async (req, res) => {
    try{
        //extract a prompt property
        //req.body: object contain data submitted in request body
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
        console.log(response, 1111111111111111111111111111);
        res.status(200).send({
            //RESPONSE: object returned by openAI API, assumed to have DATA property which contains array of CHOICES 
            //in this case, only have 1 element in that array -> choose CHOICES[0]
            //CHOICES: array of object represent possible completion of input prompt
            bot: response.data.choices[0].text
        });
    }
    catch (error){  //catch error and provide response when sth goes wrong
        console.log(error);
        res.status(500).send({ error });
    }
})

//start http server for our application to listen for incoming requests
//5000: port number that server will listen on
app.listen(5000, () => console.log('AI server started on http://localhost:5000'));