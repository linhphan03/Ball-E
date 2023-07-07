const emojiKeyMode = () => {
    document.getElementById("emoji_keyboard").style.display = "block";
    document.getElementById("form").style.display = "none";
}

const defaultMode = () => {
    document.getElementById("emoji_keyboard").style.display = "none";
    document.getElementById("form").style.display = "block";
}