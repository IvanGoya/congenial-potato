const Post = require("./Post");

Post.belongsTo(User, {
    foreignKey: 'user_id'
});