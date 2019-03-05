var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/search", function (req, res) {
    db.Events.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new event

  app.post("/api/create", function (req, res) {
    console.log("Events:");
    console.log(req.body);
    console.log(db.events);

    db.events.create({
      name: req.body.name,
      type: req.body.type,
      date: req.body.date,
      time: req.body.time,
      description: req.body.description,
      location: req.body.location,
      cost: req.body.cost

    }).then(function (results) {
      res.json(results);
      console.log(results);
    });
  });
};
