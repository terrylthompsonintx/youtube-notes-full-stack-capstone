var mongoose = require('mongoose');

var youSchema = new mongoose.Schema({

    videoId: {
        type: string,
        required: true
    }
    videoName: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    }

});



var you = mongoose.model('you', youSchema);

module.exports = you;
