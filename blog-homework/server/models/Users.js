


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
            foreignKey: 'UserId'
        })
        Users.hasMany(models.Comments, {
            foreignKey: 'UserId'
        })
    }
    return Users;
}

// TODO - proper way to exclued PW from request response. 

// sequelize.define(
//     'User',
//     {
//         id: { type: DataType.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
//         username: { type: DataType.STRING, allowNull: false },
//         password: { type: DataType.STRING, allowNull: false }
//     },
//     {
//         hooks: {
//             afterCreate: (record) => {
//                 delete record.dataValues.password;
//             },
//             afterUpdate: (record) => {
//                 delete record.dataValues.password;
//             },
//         }
//     }
// );