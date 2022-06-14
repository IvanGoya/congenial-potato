const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections.js');

class Post extends Model { }

Post.init({
    id: {
        type: DataTypes.INTEGER,
         primaryKey: true,
         allowNull: false,
         autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    post_body: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
)

module.exports = Post;