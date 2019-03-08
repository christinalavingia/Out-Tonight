var submitVendor = $("#submitNewEvent");
var searchBtn = $("#userSearch");
var showAll = $("#showAll");
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
    return $.ajax("/api/create", {
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      data: JSON.stringify(event)
    });
  },
  getEvent: function () {
    return $.ajax({
      url: "/api/search",
      type: "GET"
    });
  }
};

var showEvents = function (event) {
  event.preventDefault();
  
  $(".showEvents").empty();
  
  $.get("/api/search", function (data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      var newDiv = $("<div>");
      newDiv.addClass("scroll");
      newDiv.attr("id", "event-" + i);
      $(".showEvents").append(newDiv);

      var formattedDate = moment(data[i].date).format("MM-DD-YYYY");

      $(".showEvents").append("<br><h3>Events</h3><br>" + newDiv);
      $("#event-" + i).append("<p>Event Name: " + data[i].name + "</p>");
      $("#event-" + i).append("<p>Date: " + formattedDate + "</p>");
      $("#event-" + i).append("<p>Time: " + data[i].time + "</p>");
      $("#event-" + i).append("<p>Type: " + data[i].type + "</p>");
      $("#event-" + i).append("<p>Location: " + data[i].location + "</p>");
      $("#event-" + i).append("<p>Description: " + data[i].description + "</p>");
      $("#event-" + i).append("<p>Cost: " + data[i].cost + "</p>");
      
    }
  });
};

// ((captureDate.val() === data[i].date) && ($("#freeOnly").prop("checked")))
var searchEvents = function (event) {
  event.preventDefault();
  
  $(".showEvents").empty();
  
  $.get("/api/search/" + captureDate.val() + "T00:00:00.000Z", function (data) {
    console.log(data)
    console.log(captureDate.val());
    
        for (var i = 0; i < data.length; i++) {
          var newDiv = $("<div>");
       
          newDiv.attr("id", "event-" + i);
          $(".showEvents").append("<br><h3>Events</h3><br>" + newDiv);
          $("#event-" + i).append("<p>Event Name: " + data[i].name + "</p>");
          $("#event-" + i).append("<p>Time: " + data[i].time + "</p>");
          $("#event-" + i).append("<p>Type: " + data[i].type + "</p>");
          $("#event-" + i).append("<p>Location: " + data[i].location + "</p>");
          $("#event-" + i).append("<p>Description: " + data[i].description + "</p>");
          $("#event-" + i).append("<p>Cost: " + data[i].cost + "</p>");
        } 
  });
};

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

submitVendor.on("click", handleFormSubmit);
searchBtn.on("click", searchEvents);
showAll.on("click", showEvents);



