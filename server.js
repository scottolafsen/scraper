var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");

var PORT = process.env.PORT || 3000;
var app = express();
var routes = express.Router();

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrapegoater"

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// ######## MIDDLEWARE ############
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(routes);
// mongoose.connect("mongodb://localhost/scrapermagnum", { useNewUrlParser: true });

// ######## HTML ROUTES ############
app.get("/", function (req, res) {
  res.render("home")
});

app.get("/saved", function (req, res) {
  res.render("saved")
});

// ######## DELETE ROUTES ##########
// clear page of unfavorited articles
app.delete("/delete", function (req, res) {
  db.Article.deleteMany({ favorite: false }).then(function (error, response) {
    if (error) {
      console.log(error);
      res.send(error);
    }
    else {
      console.log(response);
      res.send(response);
    }
  });
});

app.delete("/delete/:id", function (req, res) {
  db.Article.findByIdAndDelete({ _id: req.params.id }).then(function (error, response) {
    if (error) {
      console.log(error);
      res.send(error);
    }
    else {
      console.log(response);
      res.send(response);
    }
  });
});

app.delete("/delete/note/:id", function (req, res) {
  db.Note.findByIdAndDelete({ _id: req.params.id }).then(function (error, response) {
    if (error) {
      console.log(error);
      res.send(error);
    }
    else {
      console.log(response);
      res.send(response);
    }
  });
});

// ######## SCRAPE ROUTES ##########
// Unofficial scrape route
app.get("/scrape/unoffical", function (req, res) {
  axios.get("https://unofficialnetworks.com/").then(function (response) {
    var $ = cheerio.load(response.data);
    $("div.light a").each(function (i, element) {
      var result = {};
      result.title = $(this)
        .attr("title");
      result.link = $(this)
        .attr("href");
      result.img = $(this)
        .children("img")
        .attr("src");
      result.favorite = false;
      db.Article.create(result)
        .then(function (dbArticle) {
          console.log(dbArticle);
        })
        .catch(function (err) {
          return res.json(err);
        });
    });
    res.send("Scrape Complete");
  });
});

// Snowbrains scrape route
app.get("/scrape/snowbrains", function (req, res) {
  console.log("snowbrains")
  axios.get("https://snowbrains.com/").then(function (response) {
    var $ = cheerio.load(response.data);
    $("header.entry-header").each(function (i, element) {
      var result = {};
      result.title = $(this)
      .children("div.title-wrapper").children("h2").children("a")
      .text();
      result.link = $(this)
      .children("div.title-wrapper").children("h2").children("a")
        .attr("href");
      result.img = $(this)
      .children("div.thumb-wrapper").children("a").children("img")
      .attr("src");
      result.favorite = false;
      db.Article.create(result)
        .then(function (dbArticle) {
          console.log(dbArticle);
        })
        .catch(function (err) {
          return res.json(err);
        });
    });
    res.send("Scrape Complete");
  });
});

// Teton Gravity scrape route
app.get("/scrape/tetongravity", function (req, res) {
  console.log("teton")
  axios.get("https://www.tetongravity.com/").then(function (response) {
    var $ = cheerio.load(response.data);
    $("a.image-wrap").each(function (i, element) {
      var result = {};
      result.title = $(this)
      .attr("title");
      result.link = $(this)
      .attr("href");
      result.img = $(this)
      .children("picture").children("img")
      .attr("data-srcset");
      result.favorite = false;
      console.log(result)
      db.Article.create(result)
        .then(function (dbArticle) {
          console.log(dbArticle);
        })
        .catch(function (err) {
          return res.json(err);
        });
    });
    res.send("Scrape Complete");
  });
});

// ######## GET ROUTES ##########
// Route for getting all Articles from the db with associated notes
app.get("/articles", function (req, res) {
  db.Article.find({}).populate("note")
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});


// ######## POST ROUTES ##########
// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function (req, res) {
  console.log(req.body);
  db.Note.create(req.body)
    .then(function (dbNote) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { note: dbNote._id  } }, { new: true });
    })
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// Route for favoriting (saving) article
app.post("/saved/:id", function (req, res) {
  var id = req.params.id
  db.Article.findByIdAndUpdate(id, { favorite: 'true' }).then(function (dbArticle) {
    res.json(dbArticle);
  })
    .catch(function (err) {
      res.json(err);
    });
});

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
