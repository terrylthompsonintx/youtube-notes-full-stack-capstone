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
var vidNote = require('./models/younote');





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
            //console.log(result.status, result.headers, result.body);
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
    //console.log(req.params.search);
    var searchReq = getYouTube(req.params.search);
    searchReq.on('end', function (item) {
        res.json(item);
    });
    //error handling
    searchReq.on('error', function (code) {
        res.sendStatus(code);
    });

})

app.post('/younote/', (req, res) => {
    //console.log(req.body);

    vidNote.create({
        vidId: req.body.vidUrl,
        vidName: req.body.vidTitle,
        vidDate: req.body.date,
        videoNote: req.body.note,
        vidPicUrl: req.body.vidPicUrl
    }, function (err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
    });
});

app.get('/getayounote/:id', (req, res) => {
    //console.log(req.params)
    vidNote.findById(req.params.id, function (err, item) {
        //console.log(item);
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(item);

    });
});

app.get('/getyounote/', (req, res) => {
    //console.log(req + 'getfired');
    vidNote.find(function (err, item) {
        //console.log(item);
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(item);

    });
});

app.delete('/deletenote/:id', (req, res) => {
    //console.log(req.params)
    vidNote.findByIdAndRemove(req.params.id, function (err, items) {
        if (err)
            return res.status(404).json({
                message: 'Item not found.'
            });

        res.status(201).json(items);
    });

});


app.put('/putyounote/', (req, res) => {

    var mongoeditId = req.body.mongoeditId;
    var vidTitle = req.body.vidTitle;
    var vidUrl = req.body.vidUrl;
    var date = req.body.date;
    var note = req.body.note;
    var vidPicUrl = req.body.vidPicUrl;

    //console.log(mongoeditId, vidTitle, vidUrl, date, note, vidPicUrl);
    vidNote
        .findByIdAndUpdate(mongoeditId, {
            vidId: vidUrl,
            vidName: vidTitle,
            vidDate: date,
            videoNote: note,
            vidPicUrl: vidPicUrl
        }).exec().then(function (achievement) {
            return res.status(204).end();
        }).catch(function (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        });


});









exports.app = app;
exports.runServer = runServer;
