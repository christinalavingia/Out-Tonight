// module.exports = function(sequelize, DataTypes) {
//   var Example = sequelize.define("Example", {
//     text: DataTypes.STRING,
//     description: DataTypes.TEXT
//   });
//   return Example;
// };

module.exports = function(sequelize, DataTypes) {
  var Events = sequelize.define("events", {
    name: DataTypes.TEXT,
    type: DataTypes.TEXT,
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    description: DataTypes.TEXT,
    location: DataTypes.TEXT,
    money: DataTypes.TEXT
  });
  return Events;
};
