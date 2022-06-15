const sequelize = require('../config/connection');
const userData = require('./userData.json')
const postData = require('./postData.json')
const commentData = require('./commentData.json')
const { User, Comment, Post}  = require('../models')

const seedDatabase = async () => {
    await sequelize.sync({ force: true});

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const user of userData) {
        await User.create({
            ...user,
            // user_id: users[Math.floor(Math.random() * users.length)].id,
        })
    }

    await Comment.create(commentData, {
        returning: true
    });

    for (const comment of commentData) {
        await Comment.create({
            ...comment
        })
    }

    await Post.create(postData, {
        returning: true
    });

    for (const post of postData) {
        await Post.create({
            ...post
        });
    }

    process.exit(0);
};

seedDatabase();