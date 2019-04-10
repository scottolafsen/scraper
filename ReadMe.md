# Ski News Scraper #
**[Deployed Heroku Link](https://serene-spire-42320.herokuapp.com/)**

Scrape three different Ski Industry News websites with `Cheerio` then save articles and add/delete comments

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Screenshots](#screenshots)

# General info #

- This web app allows user to scrape 3 different websites for news articles using `cheerio`, with the response and API call is made to send articles to a `Mongo` database a GET request displays articles on page.
- When a user hits a save button which is dynamically generated with each article, an ID is of article is sent via req.params for a PUT
request to database where the saved field is changed from false to true. Hitting the clear button causes a DELETE request to database which gets rid of all articles with saved field reading false
- When navigates to the saved Articles page a GET request responds with all saved articles and associated notes. Each Article has a comment section where multiple notes can be written. Articles have a one to many relationship to notes, and notes can be individually deleted

# Technologies #
Project is created with:
* `express-handlebars` version 3.0.2
* `Axios` version 0.16.2
* `Express` version 4.16.3
* `Mongoose` version 5.0.11
* `NodeJS` version 8.12.0
* `MongoDB`
* `Cheerio` version 1.0.0-rc.2
* `Morgan` version 1.9.0

# Setup # 

1. Start by installing front and backend dependencies from package.json. While in top level, run the following command:
```
npm install
```
This should install node modules within the server and the client folder.

2. After both installations complete and Mongo, run the following command in your terminal:
```
node server.js
```
- Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Screenshots #
![Screenshot](./public/images/scraper.PNG)
