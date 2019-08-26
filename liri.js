require("dotenv").config(); //we need this to read key and secret key from .env file in order do not show this info to everyone
var allIn = require('request'); //for main function 
var keys = require("./keys.js"); //to read spotify id and secret from .env file
var Spotify = require('node-spotify-api'); //we need this to search for song 
var fs = require('fs'); //we need it to read from random.txt file
var y = fs.readFileSync('./random.txt', 'utf8') //we use it with do-what-it-says command
var spotify = new Spotify(keys.spotify); //used get spotify key
var moment = require('moment')
var queryAll = process.argv.slice(3).join(' '); //query position in array
var commands = process.argv[2]; //command position in array

console.log(process.argv);
console.log(keys.spotify);

if (commands == 'concert-this') {
    apiCall = "https://rest.bandsintown.com/artists/" + queryAll + "/events?app_id=codingbootcamp";
    allIn(apiCall, function(error, response, data) {
        jp = JSON.parse(data);
        console.log('Venue: ' + jp[0].venue.name)
        console.log('Location: ' + jp[0].venue.country)
        i = moment(jp[0].datetime).format('MM/DD/YYYY')
        console.log('Date of the event: ' + i)

    })
} else if (commands == 'spotify-this-song') {

    spotify.search({ type: 'track', query: queryAll }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[1]);

    });
    // apiCall = "https://api.spotify.com/v1/search?query=" + queryAll + "&type=track&offset=20&limit=20";
    // allIn(apiCall, function(error, response, data) {
    //     if (spotify = new Spotify(keys.spotify)) {
    //         console.log(data);
    //     }


    // })


} else if (commands == 'movie-this') {
    apiCall = "https://www.omdbapi.com/?t=" + queryAll + "&y=&plot=short&apikey=trilogy";
    allIn(apiCall, function(error, response, data) {
        jp = JSON.parse(data);
        console.log('Title: ' + jp.Title);
        console.log('Year: ' + jp.Year);
        console.log('imdbRating: ' + jp.imdbRating);
        console.log('Rotten Tomatoes: ' + jp.RottenTomatoes);
        console.log('Country: ' + jp.Country);
        console.log('Language: ' + jp.Language);
        console.log('Plot: ' + jp.Plot);
        console.log('Actors: ' + jp.Actors);
    })
} else if (commands == "do-what-it-says") {

    console.log(y);

    apiCall = "https://api.spotify.com/v1/search?query=" + y + "&type=track&offset=20&limit=20"
    allIn(apiCall, function(error, response, data) {
        console.log(data)
    })
}