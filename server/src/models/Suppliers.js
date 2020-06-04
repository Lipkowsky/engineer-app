const Sequelize = require('sequelize');
const sequelize = require('./index');


  const Model = Sequelize.Model;
  class Supplier extends Model {}
  Supplier.init({
    name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    phone_NO: {
        type: Sequelize.INTEGER,
    },
  }, {
    sequelize: sequelize,
    modelName: 'suppliers'
  });



module.exports = Supplier;