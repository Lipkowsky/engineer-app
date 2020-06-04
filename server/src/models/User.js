const Sequelize = require("sequelize");
const sequelize = require("./index");


const Model = Sequelize.Model;
class User extends Model {}
User.init(
  {
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    surname: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    }
  },
  {
    sequelize: sequelize,
    modelName: "users"
    // options
  }
);

module.exports = User;
