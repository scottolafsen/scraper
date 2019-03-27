$.getJSON("/articles", function (data) {
  console.log(data)
  $("#articles").empty();
  for (var i = 0; i < data.length; i++) {
    // $("#articles").empty();
    if (data[i].favorite === true) {
      // Display the apropos information on the page
      $("#articles").append("<li class=list-group-item data-id=" + data[i]._id + ">" + data[i].title + "<br />" + data[i].link + "<btn type=button class= 'btn btn-danger delete' data-id=" + data[i]._id + ">Delete</btn>" +
        "<br /><form> <div class=form-group> <label for=title" + data[i]._id + "> Title </label><input type=text class=form-control id=title" + data[i]._id + "><label for=body" + data[i]._id + "> Write Note </label><input type=text class=form-control id=body" + data[i]._id + "><btn type=button class= 'btn btn-success note' data-id=" + data[i]._id + ">Write Note</btn></div> </form></li>");
    }
    if (data[i].note) {
      // Place the title of the note in the title input
      // Place the body of the note in the body textarea
      $("#articles").append("<li class=list-group-item>" + data[i].note.title + "||" + data[i].note.body + "</li>");
    }
  }
});

// When you click the savenote button
$(document).on("click", ".note", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  var title = $("#title" + thisId).val();
  var body = $("#body" + thisId).val();
  console.log(title, body);

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: title,
      // Value taken from note textarea
      body: body
    }
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section

    });
  // Also, remove the values entered in the input and textarea for note entry
  $("#title" + thisId).val("");
  $("#body" + thisId).val("");
});

// Delete Saved Article
$(document).on("click", ".delete", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "DELETE",
    url: "/delete/" + thisId,
  })
    // With that done
    .then(function () {
      // Log the response
      console.log("deleted");
      // Empty the notes section
    });
});



//   


