const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Comment extends Model { }

Comment.init({
    id: {
        type: DataTypes.INTEGER,
         primaryKey: true,
         allowNull: false,
         autoIncrement: true
    },
    comment_body: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
},
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
)

module.exports = Comment;