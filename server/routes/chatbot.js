const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, //required to authenticate request to openAI API
});
const openai = new OpenAIApi(configuration); //make request through OpenAI API (generate text, complete prompts with GPT3...)

//GET route: handle get request to root of URL after /
router.get('/', async (req, res) => {
    res.status(200).send({ 
        message: "Welcome"
    })
});

router.post('/', async (req, res) => {
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
        //console.log(error);
        res.status(500).send({ error });
    }
});

module.exports = router;