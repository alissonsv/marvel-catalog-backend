const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

class User extends Model {
  toJSON() {
    const user = this.get({ plain: true });
    delete user.password;

    return user;
  }
}

User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
    unique: {
      args: true,
      msg: 'Email address already in use!',
    },
  },
  password: {
    type: DataTypes.STRING,
  },
}, { sequelize });

(async () => {
  await User.sync();
})();

module.exports = User;
