module.exports = function (sequelize, DataTypes) {
  var Search = sequelize.define("Search", {
    query: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    publisher: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    searchCount: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  });
  return Search;
};
