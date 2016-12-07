//This javascript file contains various functions that serve
//the purpose of utilizing a REST API, Spotify, and hit its
//endpoints to access various data from the JSON located at the
//various endpoints

$.noConflict();
(function($) {
  $(document).ready(
  function() {
    //Declaring all members
    var uName, spotifyAPIURL, spotifySearchURL;
    var artistID, searchQuery, artistQuery;
    var numFollowers, popularityRating, associatedGenres;
    var artistsAlbumsFunction, artistAlbumsURL, albumNameArray, albumImageArray, albumDataArray;
    var i, j, k;
    var artistIMG;

    //firing up the event as the user hits the submit key
    $('#sp-form').on('submit', function(event) {
      uName = $('#sp-username').val();
      spotifyAPIURL = 'https://api.spotify.com/v1/';
      //Hitting the spotify search API with the user's search query
      spotifySearchURL = 'https://api.spotify.com/v1/search?q='+ uName +'&type=artist&limit=1';

      $.when(
    $.get(spotifySearchURL)
  ).then(function(data) {
    //storing data from API request in reference variable for later usage
    searchQuery = data;
    $.get(spotifyAPIURL + 'artists/' + searchQuery.artists.items[0].id,
      function(data) {
        //initializing some members
        artistQuery = data;
        artistID = searchQuery.artists.items[0].id;
        numFollowers = artistQuery.followers.total;
        popularityRating = artistQuery.popularity;
        artistIMG = artistQuery.images[0].url;
        associatedGenres = artistQuery.genres;
        artistAlbumsURL = spotifyAPIURL + 'artists/' + artistID + '/albums';
        console.log(artistID);

        //Appending specified artist's follows an populatity
        //info to index.html file
        $('#number-of-followers').append(
          '  ' +  numFollowers
        );
        $('#artist-popularity-rating').append(
          '  ' + popularityRating
        );

        $('#image').append(
          '<img id="image" src="' + artistIMG + '" alt=" '+ uName +'" />'
        );

        //for loop to append each listed genre to index file
        for (i = 0; i < associatedGenres.length; i++) {
          $('#artist-genres').append(
              '<li>' + associatedGenres[i] + '</li>'
            )}
        //calling function
        artistsAlbumsFunction();

      });
    event.preventDefault();
    return null;
  }).then(function() {
        //album_data = data;
    //artistsAlbumsFunction();
  });

      //function to attain artist's album information
      artistsAlbumsFunction = function() {
        console.log(popularityRating);
        $.get(
          artistAlbumsURL, function(data) {
            albumDataArray = data.items;

            //initializing fields as arrays
            albumNameArray = [];
            albumImageArray = [];

            //for loop to append album name to index file
            for (j = 0; j <= 5; j++) {
              albumNameArray.push(albumDataArray[j].name);
              $('#artist-five-albums').append(
                '<li>' + albumNameArray[j] + '</li>')
            }

            for (k = 0; k <6; k++) {
              albumImageArray.push(albumDataArray[k].images[2].url)
            }
          });
      };
    });
  });
})(jQuery);
