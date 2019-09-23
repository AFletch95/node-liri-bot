// Include packages
const Spotify = require('node-spotify-api');
//var SpotifyWebApi = require('spotify-web-api-node');
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
      choices: ["Music Search","Movie Search","Live band search"]
    }
  ])
  .then(function(user) {
    switch (user.mainMenuChoice){
      case "Music Search":
        // TODO: Search Spotify api
        console.log("Spotify Api");
        searchSpotify();
        break;
      case "Movie Search":
          // TODO: Search OMDB api
          console.log("OMDB Api");        
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
// Get spotify type
function returnSpotifyType() {
  inquirer
  .prompt([
    {
      type: "list",
      message: "What are you going to search for?",
      name: "userSearchType",
      choices: ["Artist","Album","track"]
    }
  ])
  .then(function(user) {
    console.log(user.userSearchType)
    return user.userSearchType;
  })
}

// Spotify-web-api-node
// function searchSpotify() {
//   var spotifyType = "";//returnSpotifyType();
//   var searchTerm = ""; //returnSearchTerm();  
 
//   inquirer
//   .prompt([
//     {
//       type: "list",
//       message: "What are you going to search for?",
//       name: "userSearchType",
//       choices: ["Artist","Album","track"]
//     }
//   ])
//   .then(function(user) {
//     console.log(user.userSearchType)
//     spotifyType = user.userSearchType.toLowerCase();

//     inquirer
//     .prompt([
//       {
//         type: "input",
//         message: "What would you like to search for?",
//         name: "userSearchTerm"
//       }
//     ])
//     .then(function(user) {
//       console.log(user.userSearchTerm)
//       searchTerm = user.userSearchTerm.toLowerCase();

//       searchTerm = spotifyType + ":" + searchTerm;
//       var spotifyApi = new SpotifyWebApi({
//         // clientId: '1f9422099bf64dbb866280479ed9b1cc',
//         // clientSecret: '21e27afe3bde4d87b9b31aa76def69be',
//         clientId: 'fcecfc72172e4cd267473117a17cbd4d',
//         clientSecret: 'a6338157c9bb5ac9c71924cb2940e1a7',
//         redirectUri: 'http://www.example.com/callback'
//       });

//       spotifyApi.searchTracks(searchTerm)
//       .then(function(data) {
//         console.log(data.body);
//       }, function(err) {
//         console.error(err);
//       });

//     })
//   })
// }


// node-spotify-api
function searchSpotify() {
  var spotifyType = "";//returnSpotifyType();
  var searchTerm = ""; //returnSearchTerm();  
 
  inquirer
  .prompt([
    {
      type: "list",
      message: "What are you going to search for?",
      name: "userSearchType",
      choices: ["Artist","Album","track"]
    }
  ])
  .then(function(user) {
    console.log(user.userSearchType)
    spotifyType = user.userSearchType.toLowerCase();

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
      searchTerm = user.userSearchTerm.toLowerCase();

      var spotify = new Spotify({
        id: "1f9422099bf64dbb866280479ed9b1cc",
        secret: "21e27afe3bde4d87b9b31aa76def69be"
      });
      spotify.search({ type: spotifyType, query: searchTerm, limit: 5 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      console.log(data); 
      });

    })
  })
}
 


main_menu();