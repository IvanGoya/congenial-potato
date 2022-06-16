const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections.js');

class Kanban extends Model { } 

Kanban.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "toDo" // toDo in kanban,  inProgress, complete.
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "post",
            key: "id"
        },
    },
    kanban_body: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'kanban'
    }
)

module.exports = Kanban;
