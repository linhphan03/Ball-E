const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI(); 

//GET route: handle get request to root of URL after /
router.get('/', async (req, res) => {
    res.status(200).send({ 
        message: "Welcome"
    })
});

router.post('/', async (req, res) => {
    try {
        const prompt = 'Give answer with MAXIMUM 100 words: ' + req.body.prompt;
        console.log('Prompt property: ', prompt);

        const response = await openai.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ],
            model: 'gpt-3.5-turbo',
            temperature: 1,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        });
        
        res.status(200).send({
            //RESPONSE: object returned by openAI API, assumed to have DATA property which contains array of CHOICES 
            //in this case, only have 1 element in that array -> choose CHOICES[0]
            //CHOICES: array of object represent possible completion of input prompt
            bot: response.choices[0].message.content
        });
    }
    catch (error){ 
        res.status(500).send({ error });
    }
});

module.exports = router;