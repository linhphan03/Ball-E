const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    password: String,
    name: String
})

const User = mongoose.model('users', UserSchema);

module.exports.user = User;