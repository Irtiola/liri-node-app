require("dotenv").config(); //we need this to read key and secret key from .env file in order do not show this info to everyone
var allIn = require('request'); //for main function 
var keys = require("./keys.js"); //to read spotify id and secret from .env file
var Spotify = require('node-spotify-api'); //we need this to search for song 
var fs = require('fs'); //we need it to read from random.txt file
var spotify = new Spotify(keys.spotify); //used get spotify key
var moment = require('moment')//date and time formatting
var queryAll = process.argv.slice(3).join(' '); //query position in array
var commands = process.argv[2]; //command position in array

// console.log(process.argv);
// console.log(keys.spotify);
function liri() {
    //command concert-this
    if (commands == 'concert-this') {
        apiCall = "https://rest.bandsintown.com/artists/" + queryAll + "/events?app_id=codingbootcamp";
        allIn(apiCall, function (error, response, data) {
            jp = JSON.parse(data);
            console.log('Venue: ' + jp[0].venue.name);
            console.log('Location: ' + jp[0].venue.country + ", " + jp[0].venue.city);
            i = moment(jp[0].datetime).format('MM/DD/YYYY');
            console.log('Date of the event: ' + i);
            console.log("*********************************")
        });
        //this adding commands to log.txt file
        fs.appendFile('./log.txt', commands + ", ", 'utf8', function (err) {
            // console.log(err);
        });
        //command spotify-this
    } else if (commands == 'spotify-this-song') {
        if (queryAll) {//if user input something
            spotify.search({ type: 'track', query: queryAll, limit: 1 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Song name: " + data.tracks.items[0].name);
                console.log("Preview on Spotify: " + data.tracks.items[0].uri);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log("*********************************")
            });
        } else {//if user will not put anything, this will be shown by default
            queryAll = "Bad Guy";
            spotify.search({ type: 'track', query: queryAll, limit: 1 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Song name: " + data.tracks.items[0].name);
                console.log("Preview on Spotify: " + data.tracks.items[0].uri);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log("*********************************")

            });
            fs.appendFile('./log.txt', commands + ", ", 'utf8', function (err) {
                // console.log(err);
            });
        }
        //command movie this
    } else if (commands == 'movie-this') {
        if (queryAll) {//is user input movie name
            apiCall = "https://www.omdbapi.com/?t=" + queryAll + "&y=&plot=short&apikey=trilogy";
            allIn(apiCall, function (error, response, data) {
                jp = JSON.parse(data);
                console.log('Title: ' + jp.Title);
                console.log('Year: ' + jp.Year);
                console.log('imdbRating: ' + jp.imdbRating);
                console.log('Rotten Tomatoes: ' + jp.Ratings[1].Value);
                console.log('Country: ' + jp.Country);
                console.log('Language: ' + jp.Language);
                console.log('Plot: ' + jp.Plot);
                console.log('Actors: ' + jp.Actors);
                console.log("*********************************")

            });
            fs.appendFile('./log.txt', commands + ", ", 'utf8', function (err) {
                // console.log(err);
            });

        } else {
            queryAll = "Mr.Nobody";
            apiCall = "https://www.omdbapi.com/?t=" + queryAll + "&y=&plot=short&apikey=trilogy";

            allIn(apiCall, function (error, response, data) {
                jp = JSON.parse(data);
                console.log('Title: ' + jp.Title);
                console.log('Year: ' + jp.Year);
                console.log('imdbRating: ' + jp.imdbRating);
                console.log('Rotten Tomatoes: ' + jp.Ratings[1].Value);
                console.log('Country: ' + jp.Country);
                console.log('Language: ' + jp.Language);
                console.log('Plot: ' + jp.Plot);
                console.log('Actors: ' + jp.Actors);
                console.log("*********************************")

            });
            fs.appendFile('./log.txt', commands + ", ", 'utf8', function (err) {
                // console.log(err);
            });
        }
    } else if (commands == "do-what-it-says") {
        var y = fs.readFileSync('./random.txt', 'utf8') //we use it with do-what-it-says command
        commands = y.slice(0, y.indexOf(","));
        queryAll = y.slice(y.indexOf(",") + 2);
        liri();
    };
    fs.appendFile('./log.txt', commands + ", ", 'utf8', function (err) {
        // console.log(err);
    });

}

liri();