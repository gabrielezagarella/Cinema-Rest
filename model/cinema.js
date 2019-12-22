const mongoose = require('mongoose');
var Schema = mongoose.Schema

const cinemaSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    place: {
        type: String,
        require: true,
        trim: true
    },
    film: [{ type: Schema.Types.ObjectId, ref: 'Film', default: [] }],
    ticket: [{ type: Schema.Types.ObjectId, ref: 'Ticket', default: [] }]
})

const cinemaModel = mongoose.model('Cinema', cinemaSchema);
module.exports = cinemaModel;