


module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users",  {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(360),
            allowNull: false,
            unique: true

        }



 
    })
    Users.associate = (models) => {
        Users.hasMany(models.Todos, {
            foreignKey: 'UserId'
        })
    }
    return Users;
}

