const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

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
      references: {
        model: 'Blog',
        key: 'id',
      },
    },
    comments_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
  },
  {
    
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Comment',

  }
);

module.exports = Comment;