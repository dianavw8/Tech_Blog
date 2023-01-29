const { Model, DataTypes } = require('sequelize');

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 100,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 100,
    },
    created_at: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 100,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
  }
);

module.exports = Blog;