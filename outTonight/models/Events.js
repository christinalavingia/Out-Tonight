//Create the table for sequelize

module.exports = function(sequelize, DataTypes) {
  var Events = sequelize.define("events", {
    name: DataTypes.TEXT,
    type: DataTypes.TEXT,
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    description: DataTypes.TEXT,
    location: DataTypes.TEXT,
    cost: DataTypes.TEXT
  });
  return Events;
};
