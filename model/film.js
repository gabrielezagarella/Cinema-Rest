const mongoose = require('mongoose');
var Schema = mongoose.Schema

const filmSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true
    },
    gender: {
        type: String,
        require: true,
        trim: true
    },
    exitDate: {
        type: String,
        require: true
    },
    duration: {
        type: Number,
        require: true,
        trim: true
    },
    cast: {
        type: String,
        require: true,
        trim: true
    },
    direction: {
        type: String,
        require: true,
        trim: true
    },
    startingTime: {
        type: Number,
        require: true
    }
})


const filmModel = mongoose.model('Film', filmSchema);
module.exports = filmModel;