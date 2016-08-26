# Basic Build with NPM scripts
This is a project scaffolding and build tool for the TIY Austin Front-End Engineering course. Feel free to use and enjoy! Feedback and PRs welcome!

## Features
- A bare bones scaffolding for an SPA, without any libraries built in
- A static server for serving up your dev environment via http
- `app` directory for development, preloaded with an `index.html`, `scripts/entry.js`, `scss/main.scss` and `assets/`
- `dist` directory for deployable code
- es2015 and babel, including module syntax
- mocha test runner, for support testing modules and react components with es2015 and jsx syntax using enzyme and the chai assertion library
- sass (.scss)

## Installation
- Clone this repo (or fork then clone, if you prefer)
- Remove the git history by running `rm -rf .git`
- Set up a new git repo
- Run `npm install`
- if you get permission errors you may need to run `sudo npm install` to install a couple global dependencies

## Use
- `npm install` will scaffold your project AND start the dev server
- `npm start` will start the dev server and watch for changes
- `npm test` will run any test files included in the test folder
- `npm run deploy` will push the content of `dist/` to gh-pages
- When the server is running, your site will be live on [http://localhost:8080/](http://localhost:8080/)

## Dependencies
- `sass` [install guide here](http://sass-lang.com/install)



//FINAL PROJECT

//pitch -- For my final project I want to create a computer/application game that is classic, timeless, and approachable. It's a game everyone has seen or maybe even have played before, but the beauty behind it will be its simplicity and ability to attract many people. I want to create a game that will have objects falling from the sky and the player will catch the falling objects when they get to the bottom of the screen. It will most likely be "falling food" and the player will have to catch the food in a "basket". (falling objects are subject to change on how creative i get). I want to create a game that is easy to play and is a "stress reliever" something that doesnt use a lot of brain power, but controls the brain. (as in, I never want to put down this game!). And I'll be honest, Im not the greatest coder here, so I'm really shooting for something I know I can complete and master. Master the basics of functionality and styling. And with this project idea I think it'll covers a lot of basics that we went over this cohort, and with doing so I will be able to showcase my skills and abilities.

//BASIC FEATURES -- The main feature of this application is the game itself. So I want a home page, to be the entire game. At the bottom of the screen (footer) there is going to be a basket or something to catch the falling objects in, which are falling from the top of the screen. Multiple Objects will fall on the Y-axis at different speeds/times spanning the width of the page. The point of the game is to catch the objects as they get closer to the bottom of the page. The player has the ability to move the basket along the X-axis in order to catch as many falling objects as possible. By catching them, they will keep tally and raise your score. On the game page there will be a timer counting down to end the game.

//API -- I want the player to be able to login,sign up, and logout so i will use Kinvey to get a username and store that information. by signing in the data from their previous play(s) will appear. Also using a Kinvey to retrieve that information from their previous plays in the past, like high score(s).

data modeling: list all front end models/collections you anticipate using for your app. provide sample JSON for each model. explain relationships between models where they exist.

//DATA -- Im unsure of how you want us to do this project. Whether it is all in React or not. The more i kept writing the more i was concerned if this could be done in React. I know it can be done in javascript, but since I wasnt here, I dont know if the requirements are in React. So now I am thinking I might have to change my final project idea.

-- Login --sign up --logout -- game view --modal/end of game --session

//MODELS --login --logout --signup //COLLECTIONS -- game collection

//ROUTES -- i will have routes from login and sign up to the game view -- game view to logout route which leads to the login page -- a game view to a "end of game" modal

//SPECIAL FEATURES -- for the graphics I will try to hand draw the falling objects and everything that seems fit in Illustrator.

// I know this is a final poject that we alone are suppose to think of. But maybe we can chat and discuss some things based on the this project since I missed class the other day. I was hoping that talking to you can give me a better understanding of this project and maybe come up with a better final project idea.

///MVP

//GAME VIEW -user sees food falling from the top of the screen to the bottom of the screen. Falling on the Y-axis -Food will continuously fall from top of the screen spanning the entire width of the screen until the game is concluded -User will see/control a basket at the bottom of the screen which moves right -to-left on the X-axis. -User will move the basket along the X-axis, trying to catch the falling food.

//score -As the user catches the food in the basket, the score will go up depending on the number of items caught -?? Health Bar will indicate the end of the game by going down depending on the number of missed items. -?? Time clock will indicate the end of the game. 60 seconds given to player to play, until the end of the game.

//END OF GAME modalAt the conclusion of the game, a modal screen will pop up indicating the time has ran out and the score the player received based on the items caught. -The end of game modal will show the results of how many items were caught and an overall score of the total games the player has played. -2 buttons: one to go back to the game and one to see the leaderboard

// LEADERBOARD modal -leaderboard will indicate the players high score and their ranking amongst other players. -they will see a list indicating the Rank,Score,and Name

//FOOTER -User will see a footer on the bottom of the page and it will indicate a score based on how many items were caught/not-caught. -Score bar will show a timeclock indicating the game time. -a button to view the leaderboard -a logout button -Once signed in the player will see their accumulated score from previous games

//PS i have no idea how to use trello... figuring it out =]
