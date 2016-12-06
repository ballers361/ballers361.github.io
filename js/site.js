(function($) {
  $(document).ready(
  function() {
    var uName, spotify_API_URL, spotify_client_ID, spotify_search_URL, spotify_client_secret;
    var spotify_artist_albums, artist_ID, artist_bio, album_bio;
    var num_followers, popularity_rating, genres, image_url, popularity_rating, associated_genres;

  $('#sp-form').on('submit', function(event) {
      uName = $('#sp-username').val();
      spotify_API_URL = 'https://api.spotify.com/v1/';
      spotify_client_ID = '09c1185efbd44df3a3a7c566b1878f40';
      spotify_client_secret = 'c1c16dda17f341e0a973f8c1b0fd6bea';
      spotify_search_URL = 'https://api.spotify.com/v1/search?q='+ uName +'&type=artist&limit=1';
      console.log(uName);
      console.log(spotify_search_URL);

      $.get(
        spotify_search_URL, function(data) {
          artist_ID = data.artists.items[0].id;
          artist_albums_URL = spotify_API_URL + 'artists/' + artist_ID + '/albums';

          $('#primary').append(
          '<p>' + '</p>'
          );
            event.preventDefault();


            artist_bio();
            album_bio();


      });

      artist_bio = function() {
          $.get(
            spotify_API_URL + 'artists/' + artist_ID, function(data) {
              num_followers = data.followers.total;
              popularity_rating = data.popularity;
              image_url = data.images[0].url;
              associated_genres = data.genres;

              $('#number-of-followers').append(
                '  ' +  num_followers
              );
              console.log(num_followers);
              console.log(artist_ID);
              console.log(image_url);
              console.log(data.genres);
              $('#image').append(
                '<img src="' + image_url + '" alt=" '+ uName +'" />'
              );

            for ( var i = 0; i < associated_genres.length; i++) {
                $('#artist-genres').append(
                  '<li>' + associated_genres[i] + '</li>'
                )};
      })};

      album_bio = function() {
        $.get(
          artist_albums_URL, function(data) {
            console.log(artist_albums_URL);
            $('#artist-genres').append(
              '<li>' + artist_albums_URL + '</li>'
            );
          }

        )};
    });
  });
})(jQuery);
