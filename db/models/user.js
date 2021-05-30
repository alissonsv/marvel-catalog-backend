/* eslint-disable */
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    comics: DataTypes.ARRAY(DataTypes.INTEGER),
    characters: DataTypes.ARRAY(DataTypes.INTEGER),
    tokens: DataTypes.ARRAY(DataTypes.TEXT)
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};