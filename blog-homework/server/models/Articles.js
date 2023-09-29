//const Users = require('./Users');
module.exports = (sequelize, DataTypes) => {

    const Articles = sequelize.define("Articles",  {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(73),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        isLive : {
            type: DataTypes.BOOLEAN, 
            allowNull: false,
            defaultValue : true
        }

    })
    Articles.associate = (models) => {
        Articles.belongsTo(models.Users);
    }
    return Articles;
}