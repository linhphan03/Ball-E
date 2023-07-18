document.getElementById("emoji_to_story").addEventListener("click", () => {
    document.getElementById("emoji_keyboard").style.display = "block";
    document.getElementById("form").style.display = "none";
})

document.getElementById("default_conversation").addEventListener("click", () => {
    document.getElementById("emoji_keyboard").style.display = "none";
    document.getElementById("form").style.display = "block";
})