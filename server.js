const express = require('express');
const morgan = require('morgan');
//var unirest = require('unirest');
var events = require('events');
const mongoose = require('mongoose');
var config = require('./config');
const app = express();
app.use(express.static('public'));
const bodyParser = require('body-parser');




const youTubeSearchApiUrl = "https://www.googleapis.com/youtube/v3/search";
const myGoogleKey = 'AIzaSyCHXrCpLMW0YYC6gQeu1jPxZZDwJwPEW3c';

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


app.get('/getyoutubedata/', (req, res) => {


});
app.get('/getyounote/id', (req, res) => {


});
app.post('/younote/', (req, res) => {});
app.put('/younote/:id', (req, res) => {});
app.delete('/deletenote/:id', (req, res) => {});









exports.app = app;
//exports.runServer = runServer;
