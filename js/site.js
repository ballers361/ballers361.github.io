(function($) {
  $(document).ready(
  function() {
    var uName, spotify_API_URL, spotify_client_ID, spotify_search_URL, spotify_client_secret;
    var spotify_artist_albums, artist_ID, artist_bio, album_bio, searchQuery, artistQuery;
    var num_followers, popularity_rating, genres, image_url, popularity_rating, associated_genres;
    var artists_albums_function, artist_albums_URL, album_name_array, album_image_array, album_data_array;

  $('#sp-form').on('submit', function(event) {
      uName = $('#sp-username').val();
      spotify_API_URL = 'https://api.spotify.com/v1/';
      spotify_client_ID = '09c1185efbd44df3a3a7c566b1878f40';
      spotify_client_secret = 'c1c16dda17f341e0a973f8c1b0fd6bea';
      spotify_search_URL = 'https://api.spotify.com/v1/search?q='+ uName +'&type=artist&limit=1';
      //console.log(uName);
      //console.log(spotify_search_URL);
      //function to get the user's search query for an artist's name

  $.when(
    $.get(spotify_search_URL)
  ).then(function(data) {
    searchQuery = data;
    //artist_ID = initialRequest.artists.items[0].id;
    //artist_albums_URL = spotify_API_URL + 'artists/' + artist_ID + '/albums' ;
    $.get(spotify_API_URL + 'artists/' + searchQuery.artists.items[0].id,
      function(data) {
        artistQuery = data;
        artist_ID = searchQuery.artists.items[0].id;
        num_followers = artistQuery.followers.total;
        popularity_rating = artistQuery.popularity;
        image_url = artistQuery.images[0].url;
        associated_genres = artistQuery.genres;
        artist_albums_URL = spotify_API_URL + 'artists/' + artist_ID + '/albums';
        console.log(artist_ID);

        $('#number-of-followers').append(
          '  ' +  num_followers
        );
        $('#artist-popularity-rating').append(
          '  ' + popularity_rating
        );

        $('#image').append(
          '<img src="' + image_url + '" alt=" '+ uName +'" />'
        );

        for ( var i = 0; i < associated_genres.length; i++) {
            $('#artist-genres').append(
              '<li>' + associated_genres[i] + '</li>'
            )};
            artists_albums_function();

          });
        event.preventDefault();
        return null;
      }).then(function() {
        //album_data = data;
        artists_albums_function();
      });
      artists_albums_function = function() {
        console.log(image_url);
        $.get(
          artist_albums_URL, function(data) {
            album_data_array = data.items;

            album_name_array = [];
            album_image_array = [];

            for (var j = 0; j <= 5; j++) {
              album_name_array.push(album_data_array[j].name);
                $('#artist-five-albums').append(
                '<li>' + album_name_array[j] + '</li>')
            };

            for (var k = 0; k <6; k++) {
              album_image_array.push(album_data_array[k].images[2].url)
            };
          });
      };
    });
  });
})(jQuery);
