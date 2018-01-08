var mongoose = require('mongoose');

var note = new mongoose.Schema({

videoId: {
type: string,
required:true
}
videoNote: {
type: String,
required: true
},


});



var note = mongoose.model('note', noteSchema);

module.exports = note;