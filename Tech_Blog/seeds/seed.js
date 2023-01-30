const sequelize = require('../config/connection');
const { User } = require('../models');
const { Blog } = require('../models');
const { Comment } = require('../models');


const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Blog.bulkCreate(blogData, {
    returning: true
  });
  await Comment.bulkCreate(commentData, {
    returning: true
  });


  process.exit(0);
};

seedDatabase();
