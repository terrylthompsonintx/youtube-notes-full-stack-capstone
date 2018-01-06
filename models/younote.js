var mongoose = require('mongoose');

var youSchema = new mongoose.Schema({

    videoName: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    notes: {
        type: Array,
        required: false
    }





});

var recipe = mongoose.model('younote', younoteSchema);

module.exports = recipe;
