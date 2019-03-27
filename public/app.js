// Loads unsaved articles on page
function loadArticles() {
  $.getJSON("/articles", function (data) {
    $("#articles").empty();
    for (var i = data.length - 1; i >= 0; i--) {
      if (data[i].favorite === false) {
        $("#articles").append("<li class=list-group-item data-id=" + data[i]._id + "><img src=" + data[i].img + " class=img-fluid alt=Responsive image><a href=" + data[i].link + " class=btn btn-primary stretched-link>" + data[i].title + "</a><btn type=button class= 'btn btn-success saveArt' data-id=" + data[i]._id + ">Save Article</btn> </li>");
      }
    }
  });
}

$(document).on("click", ".saveArt", function () {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/saved/" + thisId
  }).then(function () {
    loadArticles();
    console.log("favorited");
  })
});

$(document).on("click", ".clear", function () {
  $.ajax({
    method: "DELETE",
    url: "/delete"
  }).then(function () {
    loadArticles();
    console.log("deleted");
  })
});

$(document).on("click", "#scrape-unoffical", function () {
  $.ajax({
    method: "GET",
    url: "/scrape/unoffical"
  }).then(function () {
    loadArticles();
    console.log("scraped");
  })
});

$(document).on("click", "#scrape-snowbrains", function () {
  $.ajax({
    method: "GET",
    url: "/scrape/snowbrains"
  }).then(function () {
    loadArticles();
    console.log("scraped");
  })
});

$(document).on("click", "#scrape-teton", function () {
  $.ajax({
    method: "GET",
    url: "/scrape/tetongravity"
  }).then(function () {
    loadArticles();
    console.log("scraped");
  })
});

loadArticles();


