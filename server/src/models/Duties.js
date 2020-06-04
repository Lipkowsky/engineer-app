const Sequelize = require('sequelize');
const sequelize = require('./index');
const User = require('./User');

  const Model = Sequelize.Model;
  class Duty extends Model {}
  Duty.init({
    name: {
        type: Sequelize.STRING,
    }
  }, {
    sequelize: sequelize,
    modelName: 'duties'
  });

  Duty.hasMany(User);
  User.belongsTo(Duty);


module.exports = Duty;