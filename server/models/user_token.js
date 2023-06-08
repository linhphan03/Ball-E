const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserTokenSchema = new Schema({
   user_id: String,
   token: String
});