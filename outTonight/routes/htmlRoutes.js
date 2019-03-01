var db = require("../models");

module.exports = function (app) {
  // Load index page

  app.get("public/styles/styles.css", function (req, res) { res.send("public/styles/styles.css"); res.end(); });

  app.get("/", function (req, res) {
    db.events.findAll({}).then(function (dbExamples) {
      res.render("index", {
        // msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/create", function (req, res) {
    db.events.findAll({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("vendor", {
        example: dbExample
      });
    });
  });

  app.get("/search", function (req, res) {
    db.events.findAll({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("search", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
