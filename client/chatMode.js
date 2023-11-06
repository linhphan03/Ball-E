document.getElementById("emoji_to_story").addEventListener("click", () => {
    document.getElementById("emoji_keyboard").style.display = "block";
    document.getElementById("form").style.display = "none";
    document.getElementById("chat_container").style.display = "block";
    document.getElementById("object_detection_container").style.display = "none";
})

document.getElementById("default_conversation").addEventListener("click", () => {
    document.getElementById("emoji_keyboard").style.display = "none";
    document.getElementById("form").style.display = "block";
    document.getElementById("chat_container").style.display = "block";
    document.getElementById("object_detection_container").style.display = "none";
})

document.getElementById("object_detection").addEventListener("click", () => {
    document.getElementById("emoji_keyboard").style.display = "none";
    document.getElementById("form").style.display = "none";
    document.getElementById("chat_container").style.display = "none";
    document.getElementById("object_detection_container").style.display = "flex";
})
