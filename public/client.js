var d = new Date();


// HTML Builder Functions

function videoSearchOut() {

}

function previousNotesOut() {

}


function sendSearchString(getSearchData) {
    $.ajax({
            type: "GET",
            url: '/getyoutubedata/' + getSearchData,
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
    console.log(searchString);
    sendSearchString(searchString);
})
