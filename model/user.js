const mongoose = require('mongoose');
var Schema = mongoose.Schema

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    }
})

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;