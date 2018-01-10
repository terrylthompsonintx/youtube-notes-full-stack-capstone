var mongoose = require('mongoose');

var noteSchema = new mongoose.Schema({

    videoId: {
        type: String,
        required: true
    },
    noteDate: {
        type: String,
        required: true
    },
    videoNote: {
        type: String,
        required: true
    },


});



var note = mongoose.model('note', noteSchema);

module.exports = note;
