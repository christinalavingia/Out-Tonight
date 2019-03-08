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
    $(".showEvents").append("<br><h3>Events</h3><br>");

    $.get("/api/search", function (data) {
        append(data);
    });
};

var searchEvents = function (event) {
    event.preventDefault();
    $(".showEvents").empty();
    var checked = $("#freeOnly").is(":checked");

    if (!checked && captureDate.val() === "") {
        alert("Select a date or click the Show All button to see all events.")

    } else if (checked && (captureDate.val() === "")) {
        console.log('I am working')
        $.get("/api/search/free/", function (data) {
            append(data);
        })
    } else if (checked && (captureDate.val() !== "")){
        $.get("/api/search/free/" + captureDate.val() + "T00:00:00.000Z", function (data) {
            append(data);
        });
    }else {
        captureDate.append("<br><h3>Events</h3><br>");
        $.get("/api/search/date/" + captureDate.val() + "T00:00:00.000Z", function (data) {
            append(data);

        });
    }
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

function append(data) {
    for (var i = 0; i < data.length; i++) {
        var newDiv = $("<div>");
        newDiv.addClass("results");
        newDiv.attr("id", "event-" + i);
        $(".showEvents").append(newDiv);

        var uglyDate = data[i].date;
        var prettyDate = uglyDate.slice(0, 10);

        var uglyTime = data[i].time;
        var prettyTime = uglyTime.slice(3);

        $("#event-" + i).append("<p>" + data[i].name + "</p>");
        $("#event-" + i).append("<p><b>When:</b> " + prettyDate + " at " + prettyTime + "</p>");
        $("#event-" + i).append("<p><b>Where:</b> " + data[i].location + "</p>");
        $("#event-" + i).append("<p>" + data[i].description + "</p>");
        $("#event-" + i).append("<p>Cost: $" + data[i].cost + "</p>");
    }
}