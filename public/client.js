var d = new Date();
// HTML Builder Functions

function videoSearchOut(){

}
function previousNotesOut(){

}








//Event Handlers
$('#searchIcon').on('click', function () {
    //gets user search term
    let searchString = $('#searchTerm').val();
    let searchWeekDay = $('#recipeDay').val();
    //console.log(searchString);
    sendRecepiesSearch(searchString, searchWeekDay);

    if (toggleHidden) {
        //hides the Yummly logo and displays the search display.
        toggleHidden = 0;
        $('#searchBoxReturn').toggleClass("hidden");
        $('#yLogo').toggleClass("hidden");
    }
});
