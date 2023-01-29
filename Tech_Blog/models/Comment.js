const { Model, DataTypes } = require('sequelize');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 250,
    },
    date_posted: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comments_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  }
);

module.exports = Comment;