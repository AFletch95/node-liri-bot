// Include packages
const Spotify = require('node-spotify-api');
const inquirer = require("inquirer");
const axios = require("axios");


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
      id: "1f9422099bf64dbb866280479ed9b1cc",
      secret: "21e27afe3bde4d87b9b31aa76def69be"
    });
    spotify.search({ type: 'track', query: searchTerm, limit: 1 }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
    console.log(JSON.stringify(data.tracks.items[0].album.artists,null,2)); 
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


main_menu();