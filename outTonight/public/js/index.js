// Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
var submitVendor = $("#submitNewEvent");
// var $exampleList = $("#example-list");
var searchBtn = $("#userSearch");

var eventName = $("#eventName");
var eventType = $("#eventType");
var eventDate = $("#eventDate");
var eventTime = $("#eventTime");
var eventLocation = $("#eventLocation");
var eventDescription = $("#eventDescription");
var eventCost = $("#eventCost");

var captureDate = $("#searchDate");
var checkBox = $("#freeOnly");

// The API object contains methods for each kind of request we'll make
var API = {
  saveEvent: function (event) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/create",
      data: JSON.stringify(event)
    });
  },
  getEvent: function () {
    return $.ajax({
      url: "api/search",
      type: "GET"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
// var refreshEvent = function() {
//   API.getEvent().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };
// seach functions




var searchEvents = function (event) {
  event.preventDefault();
  API.getEvent().then(function (data) {
    if ((captureDate.val() === data[i].date) && ($("#freeOnly").prop("checked"))) {
      // Make a get request to our api route that will return every book
      $.get("/api/all", function (data) {
        // For each book that our server sends us back
        for (var i = 0; i < data.length; i++) {
          // Create a parent div to hold book data
          var newDiv = $("<div>");
          // Add a class to this div: 'well'
          newDiv.addClass("scroll");
          // Add an id to the well to mark which well it is
          newDiv.attr("id", "event-" + i);
          // Append the well to the well section
          $("#showEvents").append(newDiv);

          // Now  we add our book data to the well we just placed on the page
          $("<h3>Events</h3>");
          $("#event-" + i).append("<p>" + (i + 1) + ". " + data[i].id + "</p>");
          $("#event-" + i).append("<p>Event Name: " + data[i].name + "</p>");
          $("#event-" + i).append("<p>Date: " + data[i].date + "</p>");
          $("#event-" + i).append("<p>Time: " + data[i].time + "</p>");
          $("#event-" + i).append("<p>Type: " + data[i].type + "</p>");
          $("#event-" + i).append("<p>Location: " + data[i].location + "</p>");
          $("#event-" + i).append("<p>Description: " + data[i].description + "</p>");
          $("#event-" + i).append("<p>Cost: " + data[i].cost + "</p>");
        }
      });

    }
  });

  captureDate.val();


};
// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var eventListing = {
    name: eventName.val().trim(),
    type: eventType.val(),
    date: eventDate.val(),
    time: eventTime.val().trim(),
    description: eventDescription.val().trim(),
    location: eventLocation.val().trim(),
    cost: eventCost.val().trim()
  };
  console.log(eventName.val());
  console.log(eventDescription.val());
  console.log(eventType.val());
  console.log(eventDate.val());
  console.log(eventTime.val());
  console.log(eventCost.val());
  console.log(eventLocation.val());


  if (eventName.val() === "" || eventDescription.val() === "" || eventDate.val() === ""
    || eventTime.val() === "" || eventLocation.val() === "" || eventCost.val() === "" || eventType.val() === null) {
    alert("You must fill out every field!");
  } else {
    API.saveEvent(eventListing).then(function () {
      // refreshEvent();
      alert("Event created successfully!");

      return;
    });
  }

  eventName.val("");
  eventType.val("Select an Option");
  eventDate.val("");
  eventTime.val("");
  eventDescription.val("");
  eventLocation.val("");
  eventCost.val("");
};





// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// Add event listeners to the submit and delete buttons
submitVendor.on("click", handleFormSubmit);
searchBtn.on("click", searchEvents);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);


// // Make a get request to our api route that will return every book
// $.get("/api/all", function (data) {
//   // For each book that our server sends us back
//   for (var i = 0; i < data.length; i++) {
//     // Create a parent div to hold book data
//     var newDiv = $("<div>");
//     // Add a class to this div: 'well'
//     newDiv.addClass("scroll");
//     // Add an id to the well to mark which well it is
//     newDiv.attr("id", "event-" + i);
//     // Append the well to the well section
//     $("#showEvents").append(newDiv);

//     // Now  we add our book data to the well we just placed on the page
//     $("<h3>Events</h3>");
//     $("#event-" + i).append("<p>" + (i + 1) + ". " + data[i].id + "</p>");
//     $("#event-" + i).append("<p>Event Name: " + data[i].name + "</p>");
//     $("#event-" + i).append("<p>Date: " + data[i].date + "</p>");
//     $("#event-" + i).append("<p>Time: " + data[i].time + "</p>");
//     $("#event-" + i).append("<p>Type: " + data[i].type + "</p>");
//     $("#event-" + i).append("<p>Location: " + data[i].location + "</p>");
//     $("#event-" + i).append("<p>Description: " + data[i].description + "</p>");
//     $("#event-" + i).append("<p>Cost: " + data[i].cost + "</p>");
//   }
// });
