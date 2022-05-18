const Bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user_credentials', {
    // attributes
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    e_mail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    u_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_admin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    instanceMethods: {
      generateHash(password) {
        return Bcrypt.hash(password, Bcrypt.genSaltSync(8));
      },
      validPassword(password) {
        return Bcrypt.compare(password, this.password);
      }
    }
  })

  return { name: 'User', schema: User }
};
