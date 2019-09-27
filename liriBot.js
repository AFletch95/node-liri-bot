// Include packages
const Spotify = require('node-spotify-api');
const inquirer = require("inquirer");
const axios = require("axios");
const moment = require("moment");
require("dotenv").config();
const keys = require("./keys.js");


// Inquirer main menu
function main_menu() {
  inquirer
  .prompt([
    {
      type: "list",
      message: "Main Menu",
      name: "mainMenuChoice",
      choices: ["Song Search","Movie Search","Live band search"]
    }
  ])
  .then(function(user) {
    switch (user.mainMenuChoice){
      case "Song Search":
        // TODO: Search Spotify api
        console.log("Spotify Api");
        searchSpotify();
        break;
      case "Movie Search":
          // TODO: Search OMDB api
          console.log("OMDB Api");
          searchOmdbApi()        
          break;
      case "Live band search":
          // TODO: Search bandsInTown api
          console.log("bandsInTown Api");
          searchBandsinTown();        
          break;
    }
  })
} // main_menu()

// Get search term
function returnSearchTerm() {
  inquirer
  .prompt([
    {
      type: "input",
      message: "What would you like to search for?",
      name: "userSearchTerm"
    }
  ])
  .then(function(user) {
    console.log(user.userSearchTerm)
    return user.userSearchTerm;
  })
}

// node-spotify-api
function searchSpotify() {
  var searchTerm = "Mr. Nobody"; //returnSearchTerm();  
  inquirer
  .prompt([
    {
      type: "input",
      message: "What song would you like to search for?",
      name: "userSearchTerm"
    }
  ])
  .then(function(user) {
    console.log(user.userSearchTerm)
    if (user.userSearchTerm != ""){
      searchTerm = user.userSearchTerm.toLowerCase();}

      var spotify = new Spotify({
        id: keys.spotifyKeys.id,
        secret: keys.spotifyKeys.secret
      });

    spotify.search({ type: 'track', query: searchTerm, limit: 1 }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log('\n');
    console.log(data.tracks.items[0].name);
    console.log("Album name: ",data.tracks.items[0].album.name);
    console.log("By: ",data.tracks.items[0].album.artists[0].name);
   console.log(data.tracks.items[0].external_urls.spotify); 
    });
  })
}
 
function searchOmdbApi() {
  // var searchTerm = returnSearchTerm();

  inquirer
  .prompt([
    {
      type: "input",
      message: "What Movie would you like to search for?",
      name: "userSearchTerm"
    }
  ])
  .then(function(user) {
    console.log(user.userSearchTerm)
   let searchTerm = user.userSearchTerm;
  



  var queryUrl = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl)
  .then(function(respose) {
    console.log('\n');
    console.log(respose.data.Title);
    console.log(respose.data.Year);
    console.log(respose.data.Rated);
    console.log(respose.data.Released);
    console.log(respose.data.Runtime);
    console.log(respose.data.Genre);
    console.log(respose.data.Director);
    console.log(respose.data.Plot);
    
  })
  .catch(function(error) {
    if(error.respose){
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);    
  })
})
}

// search bands in town
function searchBandsinTown() {
  inquirer
  .prompt([
    {
      type: "input",
      message: "What would you like to search for?",
      name: "userSearchTerm"
    }
  ])
  .then(function(user) {
    console.log(user.userSearchTerm)
   let searchTerm = user.userSearchTerm;

    let url = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp";

    axios.get(url)
    .then(function(response) {
      let tourList = response.data;
      if(tourList === '\n{warn=Not found}\n'){
        console.log("No concerts found for ",searchTerm);
        return;
      }
      else{
      if(tourList.length > 5){
        tourList.length = 5;
      }
      for(let i=0;i<tourList.length;i++){
        let venue = tourList[i].venue;
        let x = tourList[i];
        console.log('\n');
        console.log("Venue name: ",venue.name);
        console.log("Venue location: ",venue.city,venue.region,venue.country);
        let momentDateTime = moment(tourList[i].datetime).format("MM-DD-YYYY, HH:MM a");

        console.log("Date and time",momentDateTime);
        console.log("Line up: ",tourList[i].lineup)
      }
      
    }
    })
  })
  
}
main_menu();
