const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../db/sequelize');

class User extends Model {
  static async findByCredentials(email, password) {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error('Unable to login!');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Unable to login!');
    }

    return user;
  }

  async generateAuthToken() {
    const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET);

    const tokens = this.tokens.concat(token);
    await this.update({ tokens }, {
      where: {
        id: this.id,
      },
    });

    return token;
  }

  toJSON() {
    const user = this.get({ plain: true });
    delete user.password;
    delete user.tokens;
    delete user.createdAt;
    delete user.updatedAt;

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
