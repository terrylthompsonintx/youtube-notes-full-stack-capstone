var d = new Date();


// HTML Builder Functions

function videoSearchOut() {

}

function previousNotesOut() {

}


function sendSearchString(searchData) {

    $.ajax({
            type: "GET",
            url: '/getyoutubedata/',
            data: {
                searchString: searchData
            },
            dataType: 'json',
        })
        .done(function (dataOutput) {
            console.log(dataOutput);
            videoSearchOut(dataOutput);

        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log('failed to get');
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
};





//Event Handlers
$('#searchButton').on('click', function () {
    let searchString = $('#searchFor').val();
    console.log('eventhandler fired: ' + searchString)
    sendSearchString(searchString);
})
