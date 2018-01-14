var d = new Date();
var selectedVid = '';
var selectedTitle = '';
const youTubeSearchApiUrl = "https://www.googleapis.com/youtube/v3/search";
const myGoogleKey = 'AIzaSyCHXrCpLMW0YYC6gQeu1jPxZZDwJwPEW3c';

function displayError(message) {
    $(".messageBox span").html(message);
    $(".messageBox").fadeIn();
    $(".messageBox").fadeOut(10000);
};


function unixTimestampInSecondsToAsiaDate(unixTimestampInSeconds) {
    var a = new Date(unixTimestampInSeconds * 1000);
    var year = a.getFullYear();
    var month = (a.getMonth() + 1) < 10 ? '0' + (a.getMonth() + 1) : (a.getMonth() + 1);
    var date = a.getDate() < 10 ? '0' + a.getDate() : a.getDate();
    var time = year + '-' + month + '-' + date;
    return time;
}
// HTML Builder Functions
function displaysubjectpage(selectedVid, selectedTitle, pic) {
    console.log('fired');
    console.log(pic);
    $('main').hide();
    $('.display-subject-page').show();


    var buildSubjectHtml = '';
    var buildvidhtml = '';
    var buildNote = '';

    buildSubjectHtml += '<h2 id="videoTitle"> ' + selectedTitle + '</h2>';
    buildSubjectHtml += '<h3 id="videoUrl"> ' + selectedVid + '</h3>';
    buildSubjectHtml += '<h4 id="thumbpic" class="hidden">' + pic + '</h4>';
    $("#subjectHead").html(buildSubjectHtml);
    buildvidhtml += '<iframe width="100%" height="400px" src="' + selectedVid + '"frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>';
    $("#viewSearchReturn").html(buildvidhtml);
    buildNote += '<textarea id="noteArea" id="youNote"></textarea><br>'
    $("#youNoteaArea").html(buildNote);

}

function displayOldsubjectpage(vid) {

    $('main').hide();
    $('.old-proj').show();
    console.log('displayOldsubjectpage');
    var buildvidhtml = '';
    var buildMoreHtml = '';
    var buildNoteHtml = '';
    var storedNotes = vid.vidDate + " " + vid.videoNote;
    buildMoreHtml = '<h2 id="videoTitle"> ' + vid.VidName + '</h2>';

    buildMoreHtml += '<h3 id="videoUrl"> ' + vid.vidId + '</h3>';

    $("#subjectHeadOld").html(buildMoreHtml);
    buildvidhtml += '<iframe width="100%" height="400px" src="' + vid.vidId + '"frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>';
    $("#oldSearchReturn").html(buildvidhtml);;
    buildNoteHtml += '<form>';
    buildNoteHtml += '<input class="hidden" val="' + vid._id + '">';
    buildNoteHtml += '<textarea id="editNote" >' + storedNotes + '</textarea>';
    buildNoteHtml += '</form>';
    $('youoldNoteaArea').html(buildNoteHtml);






}

function videoSearchOut(data) {
    //console.log(data);
    var buildTheHtmlOutput = "";
    $.each(data.items, function (videosArrayKey, videosArrayValue) {
        buildTheHtmlOutput += "<div class='col-3' >";
        buildTheHtmlOutput += '<div class = "stubImage" style="background-image: url(' + videosArrayValue.snippet.thumbnails.high.url + ')"></div>';
        buildTheHtmlOutput += "<p class='results'>" + videosArrayValue.snippet.title + '</p>'; //output vide title
        buildTheHtmlOutput += "<form class ='selectVid '>";
        buildTheHtmlOutput += "<input type='hidden' class='picValue' value='" + videosArrayValue.snippet.thumbnails.high.url + "'>";
        buildTheHtmlOutput += "<input type='hidden' class='title' value='" + videosArrayValue.snippet.title + "'>";
        buildTheHtmlOutput += "<input type='hidden' class='vidURL' value='https://www.youtube.com/embed/" + videosArrayValue.id.videoId + "'>"
        buildTheHtmlOutput += '<button class="button selectButton" ><i class="fa fa-hand-pointer-o" aria-hidden="true"></i> Select</button>';
        buildTheHtmlOutput += "</form>";
        buildTheHtmlOutput += "</div>";
    });
    $("#searchvidResult").html(buildTheHtmlOutput);

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

function previousNotesOut(data) {

    //console.log(data, 'fired previous');
    var oldProjHtml = "";
    //console.log(data);


    $.each(data, function (oldArrayKey, oldArrayValue) {
        //console.log(oldArrayKey, oldArrayValue);
        oldProjHtml += '<div class="col-3 oldcol" >';
        oldProjHtml += '<form class = "oldProject">';
        oldProjHtml += '<img src = "' + oldArrayValue.vidPicUrl + '" class="stubImage"><br>';
        oldProjHtml += '<label>' + oldArrayValue.vidName + '</label><br>';
        oldProjHtml += '<label>' + oldArrayValue.vidDate + '</label><br>';
        oldProjHtml += '<input type="hidden" class="mongoId" value="' + oldArrayValue._id + '">';
        oldProjHtml += '<p class = "note">' + oldArrayValue.videoNote + '</p>'
        oldProjHtml += '<button class="button deleteButton" ><i class="fa fa-trash" aria-hidden="true"></i>Delete</button>'
        oldProjHtml += '<button class="button selectNoteButton" ><i class="fa fa-hand-pointer-o" aria-hidden="true"></i> Select</button>'
        oldProjHtml += '</form>';
        oldProjHtml += '</div>';
        //console.log(oldProjHtml);
    });
    //console.log(oldProjHtml);

    $('#oldProjDisplay').html(oldProjHtml);

}









//Event Handlers
$(function () {
    $('main').hide();
    $('.home-page').show();
    $('.messageBox').hide();
});
$('#new-project').on('click', function () {
    $('main').hide();
    $('.new-proj').show();
});
$('#old-project').on('click', function () {
    $('main').hide();
    $('.display-subject-page').show();
});
$('#homeButton').on('click', function () {
    $('main').hide();
    $('.home-page').show();
})

$('#searchButton').on('click', function () {

    event.preventDefault();

    let searchString = $('#searchFor').val();
    $('#searchFor').val('');
    //console.log('eventhandler fired: ' + searchString)
    $.ajax({
            method: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            url: '/getyoutubedata/' + searchString,
        })
        .done(function (result) {
            videoSearchOut(result);
            //console.log(result);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });

})

$(document).on('click', '.deleteButton', function (event) {
    event.preventDefault();
    var deleteId = $(this).parent().find('.mongoId').val();
    console.log(deleteId);
    $.ajax({
            method: 'DELETE',
            dataType: 'json',
            contentType: 'application/json',
            url: '/deletenote/' + deleteId,
        })
        .done(function (result) {

            displayError('Note Deleted');
            $(this).parent().find('oldcol').toggleClass('hidden');

        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });

});

$(document).on('click', '.selectButton', function (event, selectedTitle, selectedVid, selectedPic) {

    event.preventDefault();
    var selectedVid = $(this).parent().find('.vidURL').val();
    //console.log(selectedVid);
    var selectedTitle = $(this).parent().find('.title').val();
    var selectedPic = $(this).parent().find('.picValue').val();
    console.log(selectedPic);
    displaysubjectpage(selectedVid, selectedTitle, selectedPic);
    //console.log(selectedVid, selectedTitle);



});

$('#saveNotebutton').on('click', function (selectedVid, selectedTitle, d) {
    //console.log('save fired');
    selectedVid = $('#videoUrl').text();
    selectedTitle = $('#videoTitle').text();
    var saveNote = $('#noteArea').val();
    var thumbURL = $('#thumbpic').text()
    x = new Date().getTime() / 1000;
    d = unixTimestampInSecondsToAsiaDate(x);
    //console.log(d);

    newNote = {
        vidTitle: selectedTitle,
        vidUrl: selectedVid,
        date: d,
        note: saveNote,
        vidPicUrl: thumbURL

    }
    //console.log(newNote);

    $.ajax({
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(newNote),
            url: '/younote/',
        })
        .done(function (result) {
            displayError('Saved');


        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});

$('#old-project').on('click', function () {

    $('main').hide();
    $('.previous-proj').show();
    $.ajax({
            method: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            url: '/getyounote/',
        })
        .done(function (result) {
            previousNotesOut(result);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        })

})
$(document).on('click', '.selectNoteButton', function (event, selectedTitle, selectedVid, selectedPic) {

    event.preventDefault();
    var selectedVid = $(this).parent().find('.mongoId').val();
    console.log(selectedVid);
    $.ajax({
            method: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            url: '/getayounote/' + selectedVid,
        })
        .done(function (result) {
            displayOldsubjectpage(result);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        })



});
