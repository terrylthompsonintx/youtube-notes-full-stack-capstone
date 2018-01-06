const express = require('express');
const morgan = require('morgan');
var unirest = require('unirest');
var events = require('events');
const mongoose = require('mongoose');
var config = require('./config');
const app = express();
app.use(express.static('public'));
const bodyParser = require('body-parser');

const youTubeSearchApiUrl = "https://www.googleapis.com/youtube/v3/search";
const myGoogleKey = 'AIzaSyCHXrCpLMW0YYC6gQeu1jPxZZDwJwPEW3c';

var runServer = function (callback) {
    mongoose.connect(config.DATABASE_URL, function (err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function () {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};




function callYouTube(subject, youTubeSearchApiUrl, myGoogleKey) {
    var query = {
        type: 'video',
        part: 'snippet',
        maxResults: 12,
        key: myGoogleKey,
        q: subject
    }
    $.getJSON(youTubeSearchApiUrl, query, displayYoutube);
};


if (require.main === module) {
    runServer(function (err) {
        if (err) {
            console.error(err);
        }
    });
}

//routes
app.get('/getyoutubedata/', (req, res) => {
    console.log(req.body);




});

//get t
app.get('/getyounote/id', (req, res) => {


});
app.post('/younote/', (req, res) => {});
app.put('/younote/:id', (req, res) => {});
app.delete('/deletenote/:id', (req, res) => {});









exports.app = app;
//exports.runServer = runServer;
