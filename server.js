const express = require('express');
const morgan = require('morgan');
var unirest = require('unirest');
var events = require('events');
const mongoose = require('mongoose');
var config = require('./config');
const app = express();
app.use(express.static('public'));
const bodyParser = require('body-parser');
app.use(bodyParser.json());
var you = require('./models/younote');
var note = require('./models/younote');




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





if (require.main === module) {
    runServer(function (err) {
        if (err) {
            console.error(err);
        }
    });
}

function handleData(data, youTubeData) {
    youTubeData = data;
}

function callYouTube(subject, youTubeSearchApiUrl, myGoogleKey) {
    var query = {
        type: 'video',
        part: 'snippet',
        maxResults: 12,
        key: myGoogleKey,
        q: subject
    }

};

var getYouTube = function (searchTerm) {

    var emitter = new events.EventEmitter();

    unirest.get("https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults=12&key=AIzaSyCHXrCpLMW0YYC6gQeu1jPxZZDwJwPEW3c&q=" + searchTerm)
        .header("Accept", "application/json")
        .end(function (result) {
            console.log(result.status, result.headers, result.body);
            //success scenario
            if (result.ok) {
                emitter.emit('end', result.body);
            }
            //failure scenario
            else {
                emitter.emit('error', result.code);
            }
        });

    return emitter;
};

//routes
app.get('/getyoutubedata/:search', function (req, res) {
    console.log(req.params.search);
    var searchReq = getYouTube(req.params.search);
    searchReq.on('end', function (item) {
        res.json(item);
    });
    //error handling
    searchReq.on('error', function (code) {
        res.sendStatus(code);
    });

})



//get t
app.get('/getyounote/id', (req, res) => {


});
app.post('/younote/', (req, res) => {

});
app.put('/younote/:id', (req, res) => {});
app.delete('/deletenote/:id', (req, res) => {});









exports.app = app;
exports.runServer = runServer;
