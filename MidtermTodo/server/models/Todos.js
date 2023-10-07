
module.exports = (sequelize, DataTypes) => {

    const Todos = sequelize.define("Todos",  {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        UserId: {
            type: DataTypes.INTEGER,
            foreignKey: true

        },
        task: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        isDone : {
            type: DataTypes.INTEGER, 
            allowNull: false,
            defaultValue : 0
        },
        isVisible : {
            type: DataTypes.INTEGER, 
            allowNull: false,
            defaultValue : 1
        }

    })
    Todos.associate = (models) => {

        Todos.belongsTo(models.Users);
    }
    return Todos;
} 