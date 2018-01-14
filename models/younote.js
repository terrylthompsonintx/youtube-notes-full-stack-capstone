var mongoose = require('mongoose');

var vidSchema = new mongoose.Schema({

    vidId: {
        type: String,
        required: true
    },
    vidName: {
        type: String,
        required: true
    },
    vidDate: {
        type: String,
        required: true
    },
    videoNote: {
        type: String,
        required: true
    },
    vidPicUrl: {
        type: String,
        required: true
    }


});



var vidNote = mongoose.model('vidNote', vidSchema);

module.exports = vidNote;
