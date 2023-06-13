//import icon from assets
import bot from './assets/bot.png';
import user from './assets/user.png';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');
let loadInterval;

//loader: clear content of element and set interval function that adds a dot to text content every 300 milliseconds
//if there are 3 dots, reset to empty string
//purpose: 3 dots loading when GPT is giving answer
function loader(element) { //element is HTML
    element.textContent = '';
    loadInterval = setInterval(() => {
        element.textContent += '.';

        if (element.textContent === '....'){
            element.textContent = '';
        }
    }, 300);
}

//typeText: add 1 character to inner HTML of element until entire text is added
function typeText(element, text){
    let index = 0;
    let interval = setInterval(() => {
        if (index < text.length){
            element.innerHTML += text.charAt(index);
            index++;
        }
        else{
            clearInterval(interval);
        }
    });
}

//generate unique ID for each message
//usually id = current time & date + a randomly generated hexadecimal string
function generateUniqueId(){
    const timeStamp = Date.now();
    const randNumber = Math.random();
    const hexadecString = randNumber.toString(16); //convert randNumber to hexadecimal, and then convert to String type

    return `id-${timeStamp}-${hexadecString}`;
}

/*create chat message with 3 parameters:
    - isAi: determine if message comes from AI or from user
    - value: contain message content generated by AI
    - uniqueId: unique identifier for message
return a string template (not regular string) because string template (a ES6 feature with `{}`) creates chat bubble with profile image
*/
function chatStripe(isAi, value, uniqueId){
    return `
    <div class="wrapper ${isAi && 'ai'}">
        <div class="chatbox">
            <div class="profile">
                <img
                    src=${isAi ? bot : user}
                    alt=${isAi ? 'bot' : 'user'} 
                />
            </div>
            <div class="message" id=${uniqueId}>
                <div class="msgText">
                    ${value}
                </div>
            </div>
        </div>
    </div>
    `;
}

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
    chatContainer.innerHTML += chatStripe(false, data.get('prompt')); //user chat stripe
    form.reset();

    //bot chat stripe with unique ID for each msg
    const uniqueId = generateUniqueId();
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId); //" ": filled in later when loading actual msg with loader function

    //chat container is scrolled to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;

    //get HTML element with unique ID
    const messageDiv = document.getElementById(uniqueId); //this HTML (response) is added at line 65 when calling chat stripe

    loader(messageDiv); //before giving response, give ... loading animation first to indicate that support is processing user input

    //connect client and server side
    //make http request to URL http://localhost:5000/
    //(await) wait for response from server before moving on to next line of code
    const response = await fetch('http://localhost:5000', {
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

    clearInterval(loadInterval); //clear loadingInterval (line 8) if one is present
    messageDiv.innerHTML = ""; //clear msg of div element that will be used to display msg from chatbot

    if (response.ok){ //if response from API is sucessful
        //read response from API as JSON object and stores in data variable
        const data = await response.json();
        const parsedData = data.bot.trim(); //extract msg from API response
        //take parsedData and add to messageDiv HTML
        typeText(messageDiv, parsedData)
    }
    else{ //response not ok -> error
        const err = await response.text();
        messageDiv.innerHTML = "Something went wrong";
        alert(err); //alert error to user if API calls fail
    }
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
