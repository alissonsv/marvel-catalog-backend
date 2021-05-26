const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../db/sequelize');

class User extends Model {
  async generateAuthToken() {
    const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET);

    const tokens = this.tokens.concat(token);
    await this.update({ tokens }, {
      where: {
        id: this.id,
      },
    });
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
  tokens: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: [],
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
