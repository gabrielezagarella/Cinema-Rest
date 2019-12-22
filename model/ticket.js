const mongoose = require('mongoose');
var Schema = mongoose.Schema

const ticketSchema = mongoose.Schema({
    film: {
        type: Schema.Types.ObjectId,
        ref: 'Film'
    },
    startingTime: {
        type: Schema.Types.ObjectId,
        ref: 'Film'
    }
})

const ticketModel = mongoose.model('Ticket', ticketSchema);
module.exports = ticketModel;