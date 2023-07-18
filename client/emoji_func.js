const allIcons = [
    "house","magnifying-glass","user","check","download","image","phone","bars","envelope","star","location-dot","music","wand-magic-sparkles",
    "heart","arrow-right","circle-xmark","bomb","poo","camera-retro","xmark","cloud","comment","caret-up","truck-fast","arrow-up","hippo",
    "face-smile","calendar-days","paperclip","shield-halved","file","bell","cart-shopping","clipboard","filter","circle-info","bolt","car",
    "ghost","mug-hot","pen","umbrella","gift","film","list","gear","trash","inbox","rotate-right","lock","headphones","barcode","tag","book",
    "bookmark","print","camera","font","video","circle-half-stroke","droplet","pen-to-square","share-from-square","plus","minus","share",
    "circle-exclamation","fire","eye","eye-slash","plane","magnet","hand","folder","folder-open","money-bill","thumbs-up","thumbs-down",
    "comments","lemon","key","thumbtack","gears","paper-plane","code","globe","truck","city","ticket","tree","wifi","paint-roller","bicycle",
    "sliders","brush","hashtag","flask","briefcase","compass","dumpster-fire","person","person-dress","address-book","bath","handshake",
    "snowflake","right-to-bracket","earth-americas","cloud-arrow-up","binoculars","palette","layer-group","users","gamepad","business-time",
    "feather","sun","link","pen-fancy","fish","bug","shop","mug-saucer","landmark","poo-storm","shirt","anchor","quote-left","bag-shopping",
    "gauge","code-compare","user-secret","stethoscope","car-side","hand-holding-heart","truck-front","cable-car","mountain-sun","location-pin",
    "info","user-minus","calendar","cart-plus","clock","circle","play","cross","backward","handshake-slash","chevron-up","passport","question",
    "pencil","phone-volume","upload","strikethrough","credit-card","street-view","database","copy","mobile","square","sort","forward","hourglass-start",
    "newspaper","notes-medical","table","building","stop","store","flag","file-excel","network-wired","cash-register","file-export","shield","address-card",
    "expand","flag-checkered","quote-right","tags","server","user-nurse","video-slash","arrow-down","blog","school","file-invoice","rocket",
    "spinner","tty","exclamation","water","registered","signature","laptop","restroom","power-off","sitemap","icons","desktop","moon",
    "calendar-week","pause","file-word","vials","language","door-open","brain","hotel","marker","star-of-life","leaf","walkie-talkie",
    "shower","caret-down","file-import","place-of-worship","wallet","award","ship","chalkboard","hands","signal","motorcycle",
    "audio-description","seedling","train","arrow-left","wrench","record-vinyl","trophy","hammer","diamond","robot","file-pdf","hospital",
    "file-contract","crown","user-plus","virus","child","repeat","cube","copyright","medal","bullseye","mask","circle-check","radio","reply",
    "chair","route","plug","calculator","dragon","certificate","fingerprint","road","crosshairs","heading","percent","user-tie","church",
    "joint","comments-dollar","truck-monster","recycle","warehouse","ruler","soap","scroll","coins","wind","baby","lightbulb","voicemail",
    "puzzle-piece","keyboard","clone","eraser","wine-bottle","dice","receipt","ring","unlock","solar-panel","ruler-vertical","circle-notch",
    "people-arrows","dollar-sign","tablet","not-equal","glasses","headset","images","window-restore","industry","stamp","microphone-slash",
    "cookie-bite","kiwi-bird","viruses","umbrella-beach","subscript","tablets","microphone","border-none","dumbbell","plane-departure","z",
    "yin-yang","yen-sign","y","xmarks-lines","x-ray","x","worm","won-sign","wine-glass-empty","wine-glass","window-minimize","window-maximize",
    "whiskey-glass","wheelchair-move","wheelchair","wheat-awn-circle-exclamation","wheat-awn","weight-scale","weight-hanging","wave-square",
    "water-ladder","wand-sparkles","wand-magic","w","vr-cardboard","volume-xmark","volume-off,volume-low","volume-high","volleyball","volcano",
    "virus-slash","virus-covid-slash","virus-covid","vihara","vial-virus","vial-circle-check","vial","vest-patches","vest","venus-mars",
    "venus-double","venus","vector-square","vault","van-shuttle","v","utensils","users-viewfinder","users-slash","users-rectangle","users-rays",
    "users-line","users-gear","users-between-lines","user-xmark","user-tag","user-slash","user-shield","user-pen","user-ninja","user-lock",
    "user-large-slash","user-large","user-injured","user-group","user-graduate","user-gear","user-doctor","user-clock","user-check","user-astronaut",
    "unlock-keyhole","universal-access","underline","u","tv","truck-plane","truck-pickup","truck-moving","trowel-bricks","trowel","triangle-exclamation",
    "tree-city","trash-can-arrow-up","trash-can","transgender","train-tram","train-subway","trailer","traffic-light","trademark","tractor",
    "tower-observation","tower-cell","tower-broadcast","tornado","torii-gate","tooth","toolbox","toilets-portable","toilet-portable",
    "toilet-paper-slash","toilet-paper","toilet","toggle-off","timeline","ticket-simple","thermometer","text-width","text-slash","text-height",
    "terminal","tent","tenge-sign","temperature-three-quarters","temperature-quarter","temperature-low","temperature-high","temperature-half",
    "temperature-full","temperature-empty","temperature-arrow-up","temperature-arrow-down","teeth-open","teeth","taxi","tarp-droplet","tarp",
    "tape","tablet-screen-button","tablet-button","table-tennis-paddle-ball","table-list","table-columns","table-cells","t","syringe",
    "synagogue","swatchbook","superscript","sun-plant-wilt","suitcase-rolling","suitcase-medical","suitcase","stroopwafel","store-slash",
    "stopwatch-20","stopwatch","sterling-sign","star-of-david","star-half-stroke","star-half","star-and-crescent","stapler","stairs",
    "staff-snake","square-virus","spray-can-sparkles","spray-can","spoon","splotch","spider","spell-check","object-ungroup","object-group","o","note-sticky","notdef","neuter","naira-sign","n","mountain-city","mountain","mound","mosquito","mosque","mortar-pestle","monument","money-check-dollar","money-check","money-bills","money-bill-wheat","money-bill-wave","money-bill-trend-up","money-bill-transfer","mobile-screen-button","mobile-screen","mobile-retro","mobile-button","mitten","minimize","mill-sign","microscope","microphone-lines-slash","microphone-lines","meteor","message","mercury","menorah","memory","maximize","mattress-pillow","masks-theater","mask-ventilator","mask-face","martini-glass-empty","martini-glass-citrus","martini-glass","mars-stroke-up","mars-stroke-right","mars-stroke","mars-double","mars-and-venus-burst","mars-and-venus","mars","map-pin","map-location-dot","map-location","map","manat-sign","magnifying-glass-plus","magnifying-glass-minus","magnifying-glass-location","magnifying-glass-dollar","magnifying-glass-chart","magnifying-glass-arrow-right","m","lungs-virus","lungs","locust","lock-open","location-pin-lock","location-crosshairs","location-arrow","litecoin-sign","list-ul","list-check","lira-sign","link-slash","lines-leaning","life-ring","less-than-equal","less-than","left-right","left-long","lari-sign","laptop-medical","laptop-file","laptop-code","landmark-flag","landmark-dome","land-mine-on","l","kitchen-set","kit-medical","kip-sign","khanda","kaaba","k","jug-detergent","jet-fighter-up","jet-fighter","jedi","jar-wheat","jar","j","italic","infinity","indian-rupee-sign","indent","image-portrait","ice-cream","i","hurricane","house-user","house-tsunami","house-signal","house-medical-flag","house-medical","house-lock","house-laptop","house-flood-water","house-flag","house-fire","house-crack","house-circle-check","house-chimney-window","house-chimney-crack","house-chimney","hotdog","hot-tub-person","hospital-user","horse-head","horse","hill-rockslide","hill-avalanche","highlighter","helmet-safety","helicopter-symbol","helicopter","heart-pulse","heart-crack","headphones-simple","head-side-virus","head-side-mask","head-side-cough-slash","head-side-cough","hat-wizard","hat-cowboy","hard-drive","children","baseball","battery-three-quarters","battery-quarter","battery-half","battery-full","battery-empty","basketball","basket-shopping"
];

import {loader, typeText, generateUniqueId, chatContainer, chatStripe} from "./utils.js";

const pre = "fa-solid fa-";
let NUM_ICONS = 40;
const MAX_EMOJI_INPUT = 7;
let iconList = [];

const doesIconExist = (index) => {
    return iconList.indexOf(index) !== -1;
}

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
                <i class="fa-solid fa-xmark"></i>
            </button>
            <button id="reset_button">
                <i class="fa-solid fa-arrows-rotate"></i>
            </button>
            <button id="create_story_button"">Create story</button>
        </div>
    `
}

const generateOneIcon = () => {
    let randIcon = Math.floor(Math.random() * allIcons.length);
    while (doesIconExist(randIcon)){
        randIcon = Math.floor(Math.random() * allIcons.length);
    }
    iconList.push(randIcon);
    return `<i class="${pre + allIcons[randIcon]} icon icon_in_board" data-name="${pre + allIcons[randIcon]}" data-id="${randIcon}"></i> `;
}

const generateIconList = () => {
    const iconRow = document.getElementById("all_icons");
    for (let i = 0; i < NUM_ICONS; i++){
        iconRow.innerHTML += generateOneIcon();
    }

    const elements = document.getElementsByClassName("icon_in_board");
    for(let i = 0; i < elements.length; i++) {
        elements[i].onclick = function () {
            inputIcon(elements[i].getAttribute("data-name"), elements[i].getAttribute("data-id"))
        }
    }
}

const inputIcon = (icon_class_name, index) => {
    const emoji_input = document.getElementById("emoji_input");

    if (emoji_input.childElementCount < MAX_EMOJI_INPUT){
        emoji_input.innerHTML += `<i class="${icon_class_name} icon" id="${index}" >`
    }   
}

generateEmojiKeyboard();
generateIconList();

const emoji_input = document.getElementById("emoji_input");

document.getElementById("create_story_button").addEventListener("click", async () => {
    const chatContainer = document.getElementById("chat_container");
    chatContainer.scrollTop = chatContainer.scrollHeight;
    chatContainer.innerHTML = "";

    chatStripe(false, "", "", emoji_input.children);
    
    if (emoji_input.children.length > 0){

        let prompt = "Create a maximum 200-word story with these keywords: ";

        for (let i = 0; i < emoji_input.children.length; i++){
            //console.log(emoji_input[i]);
            let nextID = emoji_input.children[i].id;
            prompt += allIcons[nextID] + ", ";
        }
        iconList = [];
    
        emoji_input.innerHTML = "";

        const uniqueId = generateUniqueId();
        chatStripe(true, " ", uniqueId);
        
        const messageDiv = document.getElementById(uniqueId);
        let interval = loader(messageDiv);

        //connect client and server side
        //make http request to URL http://localhost:5000/
        //(await) wait for response from server before moving on to next line of code
        const response = await fetch('https://chatgpt-server-liart.vercel.app', {
            //request use http post method to send data to server
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                //convert this object to JSON string
                prompt: prompt
            })
        });

        clearInterval(interval);
        messageDiv.innerHTML = ""; 

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
            messageDiv.innerHTML = "You exceeded your current quota, please check your plan and billing details.";
            return;
        }
    
        messageDiv.innerHTML = "Something went wrong";
    }   
    else{
        const uniqueId = generateUniqueId();
        chatStripe(true, " ", uniqueId);
        
        const messageDiv = document.getElementById(uniqueId);
        messageDiv.innerHTML = "Please input at least one emoji."

    }
})

document.getElementById("erase_button").addEventListener("click", () => {
    document.getElementById("emoji_input").innerHTML = "";
    iconList = [];
});

document.getElementById("reset_button").addEventListener("click", () => {
    document.getElementById("all_icons").innerHTML = "";
    generateIconList();
});
