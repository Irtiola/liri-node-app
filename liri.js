require("dotenv").config();//we need this to read key and secret key from .env file in order do not show this info to everyone
var allIn = require('request');//for main function 
var keys = require("./keys.js");//to read spotify id and secret from .env file
var Spotify = require('node-spotify-api');//we need this to search for song 
var fs = require('fs');//we need it to read from random.txt file
var y = fs.readFileSync('./random.txt', 'utf8')//we use it with do-what-it-says command
var spotify = new Spotify(keys.spotify);
var queryAll = process.argv.slice(3).join(' ');
var commands = process.argv[2];
console.log(process.argv);


if (commands == 'concert-this') {
    apiCall = "https://rest.bandsintown.com/artists/" + queryAll + "/events?app_id=codingbootcamp";
    console.log(apiCall)
    allIn(apiCall, function (error, response, data) {
        console.log(data);
        console.log('Venue: ' + JSON.parse(data).venue.name)
        console.log('Location: ' + JSON.parse(data).venue.country)
        console.log('Date of the event: ' + JSON.parse(data).datetime)

    })
} else if (commands == 'spotify-this-song') {

    apiCall = "https://api.spotify.com/v1/search?query=" + queryAll + "&type=track&offset=20&limit=20";
    spotify.search({
        type: 'track', query: queryAll, function(error, response, data) {
            console.log('test')
            console.log(error)
            console.log(response)
        }
    })

} else if (commands == 'movie-this') {
    apiCall = "https://www.omdbapi.com/?t=" + queryAll + "&y=&plot=short&apikey=trilogy";
    allIn(apiCall, function (error, response, data) {
        console.log('Title: ' + JSON.parse(data).Title);
        console.log('Year: ' + JSON.parse(data).Year);
        console.log('imdbRating: ' + JSON.parse(data).imdbRating);
        console.log('Rotten Tomatoes: ' + JSON.parse(data).RottenTomatoes);
        console.log('Country: ' + JSON.parse(data).Country);
        console.log('Language: ' + JSON.parse(data).Language);
        console.log('Plot: ' + JSON.parse(data).Plot);
        console.log('Actors: ' + JSON.parse(data).Actors);
    })
} else if (commands == "do-what-it-says") {

    console.log(y);
    apiCall = "https://api.spotify.com/v1/search?query=" + y + "&type=track&offset=20&limit=20"
    allIn(apiCall, function (error, response, data) {
        console.log(data)
    })
}




