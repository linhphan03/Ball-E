import bot from './assets/bot.png';
import ava1 from './assets/ava1.png';
import ava2 from './assets/ava2.png';
import ava3 from './assets/ava3.png';
import ava4 from './assets/ava4.png';
import ava5 from './assets/ava5.png';
import ava6 from './assets/ava6.png';

export const chatContainer = document.querySelector('#chat_container');
const images = [ava1, ava2, ava3, ava4, ava5, ava6];
const name = localStorage.getItem('name');

export const ava = images[name.length % images.length];

export const loader = (element) => { //element is HTML
    element.textContent = '';
    let loadInterval = setInterval(() => {
        element.textContent += '.';

        if (element.textContent === '....'){
            element.textContent = '';
        }
    }, 300);

    return loadInterval;
}

//typeText: add 1 character to inner HTML of element until entire text is added
export const typeText = (element, text) => {
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
export const generateUniqueId = () => {
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
export const chatStripe = (isAi, value, uniqueId, div) => {    
    chatContainer.innerHTML += `
    <div class="wrapper ${isAi && 'ai'}">
        <div class="chatbox">
            <div class="profile">
                <img
                    src=${isAi ? bot : ava}
                    alt=${isAi ? 'bot' : 'user'} 
                />
            </div>
            <div class="message" id=${uniqueId}>
                <div id="msgText">
                    ${value}
                </div>
            </div>
        </div>
    </div>
    `;

    if (div != undefined){
        for (let i = 0; i < div.length; i++){
            document.getElementById("msgText").innerHTML += `<i class="${div[i].className}">`
        }
    }
}