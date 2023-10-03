//const Users = require('./Users');
module.exports = (sequelize, DataTypes) => {

    const Articles = sequelize.define("Articles",  {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        UserId: {
            type: DataTypes.INTEGER,
            foreignKey: true

        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(1500),
            allowNull: false,
        },
        isLive : {
            type: DataTypes.BOOLEAN, 
            allowNull: false,
            defaultValue : true
        }

    })
    Articles.associate = (models) => {
        Articles.hasMany(models.Comments, {
            foreignKey: 'ArticleId'
        })
        Articles.belongsTo(models.Users);


    }
    return Articles;
}