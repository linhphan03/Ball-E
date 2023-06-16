const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    password: String,
    name: String,
    isVerified: {type: Boolean, default: false}
});

const User = mongoose.model('users', UserSchema);

module.exports = User;