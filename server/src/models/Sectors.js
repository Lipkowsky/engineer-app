const Sequelize = require('sequelize');
const sequelize = require('./index');
const User = require('./User');

  const Model = Sequelize.Model;
  class Sector extends Model {}
  Sector.init({
    name: {
        type: Sequelize.STRING,
    }
  }, {
    sequelize: sequelize,
    modelName: 'sectors'
  });

  Sector.hasMany(User);
  User.belongsTo(Sector);


module.exports = Sector;