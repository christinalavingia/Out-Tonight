var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/search", function(req, res) {
    db.Events.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/create", function(req, res) {
    db.Events.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
