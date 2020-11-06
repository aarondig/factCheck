// Creating Search model
module.exports = function(sequelize, DataTypes) {
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
            type: DataTypes.TEXT,
            allowNull: false,
        },
        publisher: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rating: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    });
    return Search;
};