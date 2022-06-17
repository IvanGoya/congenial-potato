const Post = require("./Post");
const User = require('./User');
const Comment = require('./Comment');
const Kanban = require("./Kanban");

// User.hasMany(Post, {
//     foreignKey: 'user_id'
// });

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Kanban.hasMany(Post, {
    foreignKey: "post_id"
});



module.exports = { User, Post, Comment, Kanban };