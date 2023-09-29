


module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users",  {
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
        }

    })
    return Users;
}