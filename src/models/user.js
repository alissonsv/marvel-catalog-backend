const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../db/sequelize');

class User extends Model {
  async generateAuthToken() {
    this.token = jwt.sign({ id: this.id }, process.env.JWT_SECRET);
    await this.save();
  }

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
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
  },
}, {
  hooks: {
    beforeSave: async (user) => {
      if (user.changed('password')) {
        // eslint-disable-next-line no-param-reassign
        user.password = await bcrypt.hash(user.password, 10);
      }
    },
  },
  sequelize,
});

(async () => {
  await User.sync();
})();

module.exports = User;
