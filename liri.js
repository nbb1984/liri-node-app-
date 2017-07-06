var input = process.argv;
var command = input[2];
var argument = input[3];
var request = require('request');
var keys = require('./keys.js');
var twitter = require('twitter');
var SpotifyWebApi = require('spotify-web-api-node');
var fs = require("fs");

	if (command === "my-tweets") {
		var data = new twitter (keys.twitterKeys);
		var params = { screen_name: 'disney', count: 20 };
		 data.get('statuses/user_timeline', params, function(error, tweets, response) {
		  		if (!error) {
		    		console.log("==================HERE ARE YOUR LAST 20 TWEETS!!!==============================")
		    		tweets.forEach(function(tweet) {
		  				console.log("===============================================================================")
		    			console.log(tweet.text);
		    			console.log("===============================================================================")

		    		});
		  		}
			});
	} 

	else if (command === "spotify-this-song") {
		var track;
		if (argument) {
			track = argument;
		} else {
			track = 'The+Sign';
		}
		var spotifyTrack = track.replace(/\+/g, ' ');
		var spotifyApi = new SpotifyWebApi(keys.spotifyKeys);
		spotifyApi.setAccessToken('BQDHYqaeZqyJ6gFNVLp5XVIDJiVTl_Jbr2b-zjRGfl93-WJzSaVDt3eSbSd901PPVSCW7H4KTJV7cdYaZcJrZcVcRLUead9EdMHDhNvszqGl67GAnws4OBm41ZlcJ6HuT9cYurlQCEQ');
		spotifyApi.searchTracks(spotifyTrack)
		  .then(function(data) {
		  	console.log("===============================================================================")
		    console.log("The Song's Artist(s) is: " + data.body.tracks.items[0].album.artists[0]);
		    console.log("The Song's Name is: " + data.body.tracks.items[0].name);
		    console.log("The link to the preview is: " + data.body.tracks.items[0].preview_url);
		    console.log("The Album is: " + data.body.tracks.items[0].album.name);
		  	console.log("===============================================================================");
		  }, function(err) {
		    console.error(err);
		  });

	}

	else if (command === "movie-this") {
		var query;
		if (argument) {
			query = argument;
		} else {
			query = 'mr+nobody';
		}
		var rottenQuery = query.replace(/\+/g, '_');
		var queryUrl = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&r=json&apiKey=40e9cece";
		request(queryUrl, function(error, response, body) {
		  if (!error && response.statusCode === 200) {
		  	var data = JSON.parse(body);

		  	console.log("==================HERE IS YOUR MOVIE DATA!!!==============================")
		    console.log("The movie's Title is: " + data.Title);
		    console.log("The movie's Year is: " + data.Year);
		    console.log("The movie's imdb Rating is: " + data.imdbRating);
		    console.log("The movie's Country is: " + data.Country);
		    console.log("The movie's Plot is: " + data.Plot);
		    console.log("The movie's Actors is: " + data.Actors);
		    console.log("The movie's Rotten Tomatoes Url is: https://www.rottentomatoes.com/m/" + rottenQuery);
		  	console.log("==========================================================================")

		  }
		});
	} 

	else if (command === "do-what-it-says") {
		fs.readFile("random.txt", "utf8", function(error, data) {
		  var dataArr = data.split(",");
	  		var spotTrack = dataArr[1];
			var spotifyApi = new SpotifyWebApi(keys.spotifyKeys);
			spotifyApi.setAccessToken('BQDHYqaeZqyJ6gFNVLp5XVIDJiVTl_Jbr2b-zjRGfl93-WJzSaVDt3eSbSd901PPVSCW7H4KTJV7cdYaZcJrZcVcRLUead9EdMHDhNvszqGl67GAnws4OBm41ZlcJ6HuT9cYurlQCEQ');
			spotifyApi.searchTracks(spotTrack)
			  .then(function(data) {
				  	console.log("===============================================================================")
				    console.log("The Song's Artist(s) is: " + data.body.tracks.items[0].album.artists);
				    console.log("The Song's Name is: " + data.body.tracks.items[0].name);
				    console.log("The link to the preview is: " + data.body.tracks.items[0].preview_url);
				    console.log("The Album is: " + data.body.tracks.items[0].album.name);
				  	console.log("===============================================================================")
			  }, function(err) {
			    console.error(err);
			  });
		});
	}

    