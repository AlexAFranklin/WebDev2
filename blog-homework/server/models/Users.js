


module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users",  {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(73),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        isActive : {
            type: DataTypes.BOOLEAN, 
            allowNull: false,
            defaultValue : true


        }

    })
    Users.associate = (models) => {
        Users.hasMany(models.Articles, {
            foreignKey: 'authorId'
        })
        Users.hasMany(models.Comments, {
            foreignKey: 'authorId'
        })
    }
    return Users;
}