const pre = "fa-solid fa-";
let NUM_ICONS = 40;
const MAX_EMOJI_INPUT = 7;
let iconList = [];

const generateEmojiKeyboard = () => {
    document.querySelector("#emoji_keyboard").innerHTML += 
    `
        <div id="all_icons">
        
        </div>
        <div id="emoji_input_outer">
            <div id="emoji_input">

            </div>
        </div>
        <div id="emoji_button">
            <button id="erase_button">
                <i class="fa-solid fa-xmark" onclick="deleteInput()"></i>
            </button>
            <button id="reset_button">
                <i class="fa-solid fa-arrows-rotate" onclick="resetList()"></i>
            </button>
            <button id="create_story_button">Create story</button>
        </div>
    `
}

const generateIcons = () => {
    const iconRow = document.getElementById("all_icons");
    for (let i = 0; i < NUM_ICONS; i++){
        iconRow.innerHTML += generateOneIcon();
    }
}

const doesIconExist = (index) => {
    return iconList.indexOf(index) !== -1;
}

const inputIcon = (icon_class_name) => {
    const emoji_input = document.getElementById("emoji_input");

    if (emoji_input.childElementCount < MAX_EMOJI_INPUT){
        emoji_input.innerHTML += `<i class="${icon_class_name}" id="icon" >`
    }   
}

const generateOneIcon = () => {
    let randIcon = Math.floor(Math.random() * allIcons.length);
    while (doesIconExist(randIcon)){
        randIcon = Math.floor(Math.random() * allIcons.length);
    }
    iconList.push(randIcon);
    return `<i class="${pre + allIcons[randIcon]}" id="icon" onclick="inputIcon('${pre + allIcons[randIcon]}')"> `;
}

generateEmojiKeyboard();
generateIcons();

const createStory = () => {
    document.getElementById("chat_container").innerHTML = "";
    const emoji_input = document.getElementById("emoji_input");

    if (emoji_input.childElementCount > 0){
        
    }   
}

const deleteInput = () => {
    document.getElementById("emoji_input").innerHTML = "";
    iconList = [];
}

const resetList = () => {
    document.getElementById("all_icons").innerHTML = "";
    generateIcons();
}