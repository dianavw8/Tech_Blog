const User = require('./User');
const Comment = require('./Comment');
const Blog = require('./Blog');

module.exports = { Blog, User, Comment };

User.hasMany(Blog, {
    foreignKey: 'user_id',
});

User.hasMany(Comment, {
    foreignKey: 'comments_user_id',
});

Blog.belongsTo(User, {
    foreignKey: 'user_id',
});
Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
});

Comment.belongsTo(User, {
foreignKey: 'user_id',
});
Comment.belongsTo(Blog, {
    foreignKey: 'comment_id',
});
