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
    .then(function(user) {
      switch (user){
        case "Music Search":
          // TODO: Search Spotify api
          console.log("Spotify Api")        
          break;
        case "Movie Search":
           // TODO: Search OMDB api
           console.log("OMDB Api")        
           break;
        case "Live band search":
           // TODO: Search bandsInTown api
           console.log("bandsInTown Api")        
           break;
      }
    })
  ])
}

main_menu();