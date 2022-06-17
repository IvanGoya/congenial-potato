const sequelize = require('../config/connections.js');
const userData = require('./userData.json')
const postData = require('./postData.json')
const commentData = require('./commentData.json')
const kanbanData = require('./kanban.json')
const { User, Comment, Post, Kanban}  = require('../models')

const seedDatabase = async () => {
    await sequelize.sync({ force: true});

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    // for (const user of userData) {
    //     await User.create({
    //         ...user,
    //         // user_id: users[Math.floor(Math.random() * users.length)].id,
    //     })
    // }

    await Post.bulkCreate(postData, {
        returning: true
    });
    
    // for (const comment of commentData) {
        //     await Comment.create({
            //         ...comment
            //     })
            // }
            
            await Comment.bulkCreate(commentData, {
                returning: true
            });
            
    // for (const post of postData) {
    //     await Post.create({
    //         ...post
    //     });
    // }

    await Kanban.bulkCreate(kanbanData, {
        returning: true
    });

    process.exit(0);
};

seedDatabase();