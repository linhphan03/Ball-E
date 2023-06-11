const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message: String,
    isFromAI: Boolean,
    time: Number 
});

const Message = mongoose.model('messages', MessageSchema);

module.exports = Message;