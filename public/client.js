var d = new Date();
var selectedVid = '';
var selectedTitle = '';
const youTubeSearchApiUrl = "https://www.googleapis.com/youtube/v3/search";
const myGoogleKey = 'AIzaSyCHXrCpLMW0YYC6gQeu1jPxZZDwJwPEW3c';

function displayError(message) {
    $(".messageBox span").html(message);
    $(".messageBox").fadeIn();
    $(".messageBox").fadeOut(5000);
};

function unixTimestampInSecondsToAsiaDate(unixTimestampInSeconds) {
    var a = new Date(unixTimestampInSeconds * 1000);
    var year = a.getFullYear();
    var month = (a.getMonth() + 1) < 10 ? '0' + (a.getMonth() + 1) : (a.getMonth() + 1);
    var date = a.getDate() < 10 ? '0' + a.getDate() : a.getDate();
    var time = year + '-' + month + '-' + date;
    return time;
}

function oldProjget() {
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
}

// HTML Builder Functions
function displaysubjectpage(selectedVid, selectedTitle, pic) {
    //console.log('fired');
    //console.log(pic);
    $('main').hide();
    $('.display-subject-page').show();


    var buildSubjectHtml = '';
    var buildvidhtml = '';
    var buildNote = '';

    buildSubjectHtml += '<h2 id="videoTitle"> ' + selectedTitle + '</h2>';
    buildSubjectHtml += '<h3 id="videoUrl" class="hidden"> ' + selectedVid + '</h3>';
    buildSubjectHtml += '<h4 id="thumbpic" class="hidden">' + pic + '</h4>';
    $("#subjectHead").html(buildSubjectHtml);
    buildvidhtml += '<iframe width="100%" height="400px" src="' + selectedVid + '"frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>';
    buildvidhtml += '<button id="backButton2" class="button" type="submit"><i class="fa fa-backward" aria-hidden="true"></i> Back</button>';
    $("#viewSearchReturn").html(buildvidhtml);
    buildNote += '<textarea id="noteArea" id="youNote" wrap="hard"></textarea><br>';
    buildNote += '<button id="saveNotebutton" class="button ctabutton"><i class="fa fa-floppy-o" aria-hidden="true"></i> Save</button>';
    $("#youNoteaArea").html(buildNote);
    displayError('View the video and take notes.  Click the Save button to save your notes.');

}

function displayOldsubjectpage(vid) {

    $('main').hide();
    $('.old-proj').show();
    //console.log(vid);
    var buildvidhtml = '';
    var buildMoreHtml = '';
    var buildNoteHtml = '';
    var storedNotes = vid.videoNote + " " + vid.vidDate;
    buildMoreHtml = '<h2 id="videoTitle">' + vid.vidName + '</h2>';

    buildMoreHtml += '<h3 class ="hidden" id="videoUrl"> ' + vid.vidId + '</h3>';

    $("#subjectHeadOld").html(buildMoreHtml);
    buildvidhtml += '<form>';
    buildvidhtml += '<iframe width="100%" height="400px" src="' + vid.vidId + '"frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>';
    buildvidhtml += '<button id="backButton" class="button" type="submit"><i class="fa fa-backward" aria-hidden="true"></i> Back</button>';
    buildvidhtml += '</form>';
    $("#oldSearchReturn").html(buildvidhtml);
    buildNoteHtml += '<form class="editForm">';
    buildNoteHtml += '<input class="hidden" id="edId"  value="' + vid._id + '">';
    buildNoteHtml += '<input  class="hidden" id="editUrl"  value="' + vid.vidId + '">';
    buildNoteHtml += '<input class="hidden" id="editName" value="' + vid.vidName + '">';
    buildNoteHtml += '<input class="hidden" id="edDate"  value="' + vid.vidDate + '">';
    buildNoteHtml += '<input class="hidden" id="editPicUrl"  value="' + vid.vidPicUrl + '">';
    buildNoteHtml += '<textarea id="editedNote" >' + storedNotes + '</textarea>';
    buildNoteHtml += '<button id="saveoldNotebutton" class="button ctabutton" type="submit"><i class="fa fa-floppy-o" aria-hidden="true"></i> Save</button>';
    buildNoteHtml += '</form>';
    //console.log(buildNoteHtml);
    $('#youoldNoteaArea').html(buildNoteHtml);
    displayError('Add additional text to your nate and push Save.')
}

function videoSearchOut(data) {
    //console.log(data);
    var buildTheHtmlOutput = "";
    $.each(data.items, function (videosArrayKey, videosArrayValue) {
        buildTheHtmlOutput += "<div class='col-3' >";


        buildTheHtmlOutput += "<form class ='selectVid '>";
        buildTheHtmlOutput += '<div class = "stubImage" style="background-image: url(' + videosArrayValue.snippet.thumbnails.high.url + ')"></div>';
        buildTheHtmlOutput += "<p class='results'>" + videosArrayValue.snippet.title + '</p>'; //output vide title
        buildTheHtmlOutput += "<input type='hidden' class='picValue' value='" + videosArrayValue.snippet.thumbnails.high.url + "'>";
        buildTheHtmlOutput += "<input type='hidden' class='title' value='" + videosArrayValue.snippet.title + "'>";
        buildTheHtmlOutput += "<input type='hidden' class='vidURL' value='https://www.youtube.com/embed/" + videosArrayValue.id.videoId + "'>"
        buildTheHtmlOutput += '<button class="button selectButton ctabutton" ><i class="fa fa-hand-pointer-o" aria-hidden="true"></i> Select</button>';
        buildTheHtmlOutput += "</form>";
        buildTheHtmlOutput += "</div>";
    });
    $("#searchvidResult").html(buildTheHtmlOutput);
    displayError('Push a Select Button to view the video and create a new note.');

}

function previousNotesOut(data) {

    //console.log(data, 'fired previous');
    var oldProjHtml = "";
    //console.log(data);


    $.each(data, function (oldArrayKey, oldArrayValue) {
        //console.log(oldArrayKey, oldArrayValue);
        oldProjHtml += '<div class="col-3 oldcol" >';
        oldProjHtml += '<form class = "oldProject">';
        oldProjHtml += '<img src = "' + oldArrayValue.vidPicUrl + '" class="stubImage">';
        oldProjHtml += '<div class="notelabel">' + oldArrayValue.vidName + '</div>';
        oldProjHtml += '<label>' + oldArrayValue.vidDate + '</label><br>';
        oldProjHtml += '<input type="hidden" class="mongoId" value="' + oldArrayValue._id + '">';
        //oldProjHtml += '<p class = "note">' + oldArrayValue.videoNote + '</p>'
        oldProjHtml += '<button class="button deleteButton" ><i class="fa fa-trash" aria-hidden="true"></i> Delete</button>'
        oldProjHtml += '<button class="button selectNoteButton ctabutton" ><i class="fa fa-hand-pointer-o" aria-hidden="true"></i> Select</button>'
        oldProjHtml += '</form>';
        oldProjHtml += '</div>';
        //console.log(oldProjHtml);
    });
    //console.log(oldProjHtml);

    $('#oldProjDisplay').html(oldProjHtml);
    displayError('Push a Delete button to delete an old note.  Push the Select button to edit an old note.');

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
});
$(document).on('click', '#backButton', function (event) {
    event.preventDefault();
    //console.log('fired');
    $('.old-proj').hide();
    $('.previous-proj').show();
});
$(document).on('click', '#backButton2', function (event) {
    event.preventDefault();
    //console.log('fired');
    $('.display-subject-page').hide();
    $('.new-proj').show();
});
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
    //console.log(deleteId);
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
    oldProjget();

});
$(document).on('click', '.selectButton', function (event, selectedTitle, selectedVid, selectedPic) {

    event.preventDefault();
    var selectedVid = $(this).parent().find('.vidURL').val();
    //console.log(selectedVid);
    var selectedTitle = $(this).parent().find('.title').val();
    var selectedPic = $(this).parent().find('.picValue').val();
    //console.log(selectedPic);
    displaysubjectpage(selectedVid, selectedTitle, selectedPic);
    //console.log(selectedVid, selectedTitle);



});
$(document).on('click', '#saveNotebutton', function (selectedVid, selectedTitle, d) {
    console.log('save fired');
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
    console.log(newNote);

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
    oldProjget();
})
$(document).on('click', '.selectNoteButton', function (event, selectedTitle, selectedVid, selectedPic) {

    event.preventDefault();
    var selectedVid = $(this).parent().find('.mongoId').val();
    //console.log(selectedVid);
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
$(document).on('submit', '.editForm', function (event) {

    event.preventDefault();

    x = new Date().getTime() / 1000;
    d = unixTimestampInSecondsToAsiaDate(x);


    var inputmongoid = $(this).parent().find('#edId').val();

    var inputvidTitle = $(this).parent().find('#editName').val();
    var inputvidUrl = $(this).parent().find('#editUrl').val();
    var inputnote = $(this).parent().find('#editedNote').val();
    var inputvidPicUrl = $(this).parent().find('#editPicUrl').val();
    let eNote = {
        mongoeditId: inputmongoid,
        vidTitle: inputvidTitle,
        vidUrl: inputvidUrl,
        date: d,
        note: inputnote,
        vidPicUrl: inputvidPicUrl

    }
    //console.log(eNote);
    $.ajax({
            method: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            url: '/putyounote/',
            data: JSON.stringify(eNote)
        })
        .done(function (result) {
            displayError('Saved');
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        })



});
