const Users = require("../models/Users");
module.exports = (sequelize, DataTypes) => {

    const Comments = sequelize.define("Comments",  {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        body: {
            type: DataTypes.STRING(5000),
            allowNull: false,
        },
        ArticleId: {
            type: DataTypes.INTEGER,
            foreignKey: true

        },
        UserId: {
            type: DataTypes.INTEGER,
            foreignKey: true

        }

    })
    Comments.associate = (models) => {
        Comments.belongsTo(models.Users);
        Comments.belongsTo(models.Articles);

    }
  
    return Comments;
}