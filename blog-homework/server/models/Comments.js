const Users = require("../models/Users");
module.exports = (sequelize, DataTypes) => {

    const Comments = sequelize.define("Comments",  {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        articleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        body: {
            type: DataTypes.STRING(5000),
            allowNull: false,
        }

    })
    Comments.associate = (models) => {
        Comments.belongsTo(models.Users);
        Comments.belongsTo(models.Articles);

    }
  
    return Comments;
}