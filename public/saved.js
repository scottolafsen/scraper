// Gets Articles from DB and prints to page
function loadPage() {
  $.getJSON("/articles", function (data) {
    console.log(data)
    $("#articles").empty();
    for (var i = 0; i < data.length; i++) {
      if (data[i].favorite === true) {
        $("#articles").append("<li class=list-group-item data-id=" + data[i]._id + "><img src=" + data[i].img + " class=img-fluid alt=Responsive image><a href=" + data[i].link + " " + "class=btn btn-primary stretched-link>" + data[i].title + "</a><btn type=button class= 'btn btn-danger delete' data-id=" + data[i]._id + ">Delete</btn>" +
          "<br /><form> <div class=form-group> <label for=title" + data[i]._id + "> Title </label><input type=text class=form-control id=title" + data[i]._id + "><label for=body" + data[i]._id + "> Write Note </label><input type=text class=form-control id=body" + data[i]._id + "><btn type=button class= 'btn btn-success note' data-id=" + data[i]._id + ">Write Note</btn></div> </form>");
      }
      var note = data[i].note
      if (note.length > 0) {
        for (var j = 0; j < note.length; j++){
        $("#articles").append("<li class=list-group-item>" + note[j].title + " ||  " + note[j].body + "    <btn type=button class= 'btn btn-danger deletenote' data-id=" + note[j]._id + ">x</btn></li>");
      }  
    }
    }
  })
};

// When you click the savenote button
$(document).on("click", ".note", function () {
  var thisId = $(this).attr("data-id");
  var title = $("#title" + thisId).val();
  var body = $("#body" + thisId).val();
  console.log(title, body);
  // Run a POST request to change the note, or create note
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: title,
      body: body
    }
  })
    .then(function (data) {
      console.log(data);
      loadPage();

    });
  $("#title" + thisId).val("");
  $("#body" + thisId).val("");
});

// Delete Saved Article
$(document).on("click", ".delete", function () {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "DELETE",
    url: "/delete/" + thisId,
  })
    .then(function () {
      loadPage();
      console.log("deleted");
    });
});

$(document).on("click", ".deletenote", function () {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "DELETE",
    url: "/delete/note/" + thisId,
  })
    .then(function () {
      loadPage();
      console.log("deleted");
    });
});

loadPage();



