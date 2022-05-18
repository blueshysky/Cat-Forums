//var Bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comments', {
    // attributes
    com_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    com_content: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    timestamps: false,
    freezeTableName: true
  })


  return { name: 'Comment', schema: Comment };
};
