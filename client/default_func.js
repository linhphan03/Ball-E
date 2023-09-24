import {loader, typeText, generateUniqueId, chatContainer, chatStripe} from "./utils.js";

const form = document.querySelector('form');

/*submit function: triggered when a form is submitted
    - e: event
    - use async - await: 
        + enable asynchronous, promise-based
*/
const handleSubmit = async (e) => {
    e.preventDefault(); //prevent default action of events: stop page from reloading when form is submitted

    //Form data object using the form element that was submitted
    //form: key value representing form data (form element from HTML - line 5)
    const data = new FormData(form);

    //add HTML to chat function which has user chat stripe and bot chat stripe
    //data.get('prompt'): add form msg from form data
    chatStripe(false, data.get('prompt')); //user chat stripe
    form.reset();

    //bot chat stripe with unique ID for each msg
    const uniqueId = generateUniqueId();
    chatStripe(true, " ", uniqueId); //" ": filled in later when loading actual msg with loader function

    //chat container is scrolled to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;

    //get HTML element with unique ID
    const messageDiv = document.getElementById(uniqueId); //this HTML (response) is added at line 65 when calling chat stripe

    let interval = loader(messageDiv); //before giving response, give ... loading animation first to indicate that support is processing user input

    //connect client and server side
    //make http request to URL http://localhost:5000/
    //(await) wait for response from server before moving on to next line of code
    const response = await fetch('https://chatgpt-server-liart.vercel.app', {
    // const response = await fetch('http://localhost:5000', {
        //request use http post method to send data to server
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            //convert this object to JSON string
            prompt: data.get('prompt')
        })
    });

    clearInterval(interval);
    messageDiv.innerHTML = ""; //clear msg of div element that will be used to display msg from chatbot

    if (response.ok){ //if response from API is sucessful
        //read response from API as JSON object and stores in data variable
        const data = await response.json();
        const parsedData = data.bot.trim(); //extract msg from API response
        //take parsedData and add to messageDiv HTML
        typeText(messageDiv, parsedData)
        return;
    }
    const err = await response.json();

    if (err.error.status == 429){
        messageDiv.innerHTML = 'You exceeded your current quota, please check your plan and billing details.';
        return;
    }

    messageDiv.innerHTML = 'Something went wrong';
}

//listen for user input in a form
//function to handle user input when form is submitted / user hit enter
//set up event listeners on form element
form.addEventListener('submit', handleSubmit); //when hit submit
form.addEventListener('keyup', (e) => { //when user 'release' (keyup) enter
    if (e.key === "Enter"){ //Enter: keycode = 13
        handleSubmit(e);
    }
}); 