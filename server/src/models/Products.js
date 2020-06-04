const Sequelize = require("sequelize");
const sequelize = require("./index");
const Sector = require("./Sectors");
const Supplier = require("./Suppliers");

const Model = Sequelize.Model;
class Product extends Model {}
Product.init(
  {
    name: {
      type: Sequelize.STRING
    },
    pieces: {
      type: Sequelize.INTEGER
    },
    price: {
      type: Sequelize.FLOAT
    },
    barcode_NO: {
      type: Sequelize.INTEGER
    },
    brand_name: {
      type: Sequelize.STRING
    },
    date_of_contact: {
      type: Sequelize.DATE
    }
  },
  {
    sequelize: sequelize,
    modelName: "products"
  }
);

Sector.hasMany(Product);
Product.belongsTo(Sector);
Supplier.hasMany(Product);
Product.belongsTo(Supplier);

module.exports = Product;
