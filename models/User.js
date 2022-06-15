const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connections.js');
require('dotenv').config();

class User extends Model {
    //bcrypt stuff
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(60),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                // Creates a new encrypted PW using bcrypt
                newUserData.password = await bcrypt.hash(newUserData.password, process.env.BCRYPT_KEY)
                return newUserData
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, process.env.BCRYPT_KEY);
                return updatedUserData
            }
        },
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
)

module.exports = User