// Grab the articles as a json

function loadArticles(){
$.getJSON("/articles", function (data) {
  $("#articles").empty();
  
  for (var i = 0; i < data.length; i++) {
    if (data[i].favorite === false){
    $("#articles").append("<li class=list-group-item data-id=" + data[i]._id + ">" + data[i].title + "<br />" + data[i].link + "<btn type=button class= 'btn btn-success saveArt' data-id=" + data[i]._id + ">Save Article</btn> </li>");
  }
}
});
}

$(document).on("click", ".saveArt", function () {
  // Empty the notes from the note section
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/saved/" + thisId
  }).then(function () {
    loadArticles();
  })
});

$(document).on("click", ".clear", function () {
  $.ajax({
    method: "DELETE",
    url: "/delete"
  }).then(function () {
    loadArticles();
  })
});

loadArticles();


