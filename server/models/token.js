const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    _userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    token: { type: String, required: true},
    createdAt: { type: Date, required: true, default: Date.now, expires: 7200}
});

const Token = mongoose.model('tokens', TokenSchema);

module.exports = Token;