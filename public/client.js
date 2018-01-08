var d = new Date();

const youTubeSearchApiUrl = "https://www.googleapis.com/youtube/v3/search";
const myGoogleKey = 'AIzaSyCHXrCpLMW0YYC6gQeu1jPxZZDwJwPEW3c';


// HTML Builder Functions
function displaysubjectpage(selectedVid, selectedTitle) {
    console.log('fired');
    var buildSubjectHtml = '';
    var buildvidhtml = '';
    var buildNote = '';
    buildSubjectHtml += '<h2> ' + selectedTitle + '</h2>';
    buildSubjectHtml += '<h3> ' + selectedVid + '</h3>';
    $("#subjectHead").html(buildSubjectHtml);
    buildvidhtml += '<iframe width="100%" height="400px" src="' + selectedVid + '"frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>';
    $("#viewSearchReturn").html(buildvidhtml);
    buildNote += '<textarea id="noteArea" id="youNote"></textarea><br>'
    $("#youNoteaArea").html(buildNote);

}

function videoSearchOut(data) {
    console.log(data);
    var buildTheHtmlOutput = "";
    $.each(data.items, function (videosArrayKey, videosArrayValue) {
        buildTheHtmlOutput += "<div class='col-3'>";
        buildTheHtmlOutput += '<div class = "stubImage" style="background-image: url(' + videosArrayValue.snippet.thumbnails.high.url + ')"></div>';
        //        buildTheHtmlOutput += "<img class='stubImage'  src='" + videosArrayValue.snippet.thumbnails.high.url + "'/>"; //display video's thumbnail
        buildTheHtmlOutput += "<p class='results'>" + videosArrayValue.snippet.title + '</p>'; //output vide title
        buildTheHtmlOutput += "<form class ='selectVid '>";
        buildTheHtmlOutput += "<input type='hidden' class='title' value='" + videosArrayValue.snippet.title + "'>";
        buildTheHtmlOutput += "<input type='hidden' class='vidURL' value='https://www.youtube.com/watch?v='" + videosArrayValue.id.videoId + "'>";
        buildTheHtmlOutput += '<button class="button selectButton" ><i class="fa fa-hand-pointer-o" aria-hidden="true"></i> Select</button>';
        buildTheHtmlOutput += "</form>";
        buildTheHtmlOutput += "</div>";
    });
    $("#searchResult").html(buildTheHtmlOutput);
}

function callYouTube(subject, youTubeSearchApiUrl, myGoogleKey) {

    var query = {
        type: 'video',
        part: 'snippet',
        maxResults: 12,
        key: myGoogleKey,
        q: subject
    }

    var data = $.ajax({
            url: youTubeSearchApiUrl,
            data: query,
            dataType: "json",
            type: "GET"
        })
        .done(function (result) {
            //console.log(result);
            videoSearchOut(result);

        })
        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log('Failed Youtube get');
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });

};

function previousNotesOut() {

}









//Event Handlers
$(function () {
    $('main').hide();
    $('.home-page').show();
});
$('#new-project').on('click', function () {
    $('main').hide();
    $('.display-subject-page').show();
});
$('#old-project').on('click', function () {
    $('main').hide();
    $('.display-subject-page').show();
});

$('#searchButton').on('click', function () {

    event.preventDefault();
    let searchString = $('#searchFor').val();
    //console.log('eventhandler fired: ' + searchString)
    $.ajax({
            method: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            url: '/getyoutubedata/' + searchString,
        })
        .done(function (result) {
            videoSearchOut(result);
            console.log(result);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });

})



$(document).on('click', '.selectButton', function (event) {

    event.preventDefault();
    var selectedVid = $(this).parent().find('.vidURL').val();
    var selectedTitle = $(this).parent().find('.title').val();

    console.log(selectedVid, selectedTitle);
    displaysubjectpage(selectedVid, selectedTitle);


});

$('#saveNoteButton').on('click', function (selectedVid, selectedTitle, d) {
    var saveNote = $('#noteArea').val();
    newNote = {
        vidTitle: selectedTitle,
        vidUrl: selectedVid,
        date: d,
        note: saveNote

    }

    $.ajax({
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(newNote),
            url: '/younote/',
        })
        .done(function (result) {


        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});
