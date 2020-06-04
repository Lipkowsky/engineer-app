const User = require("../models/User");
const Sector = require("../models/Sectors");
const Duty = require("../models/Duties");
const Product = require("../models/Products");
const Supplier = require("../models/Suppliers");

module.exports = {
  async showUsers(req, res) {
    User.findAll({
      attributes: ["name", "surname"],
      include: [
        {
          model: Sector,
          required: true
        }
      ]
    });
    Duty.findAll({
      attributes: ["name", "surname"],
      include: [
        {
          model: User,
          required: true
        }
      ]
    });
    Product.findAll({
      attributes: ["name", "surname"],
      include: [
        {
          model: User,
          required: true
        }
      ]
    });
    Supplier.findAll({
      attributes: ["name", "surname"],
      include: [
        {
          model: User,
          required: true
        }
      ]
    }).then(users => {
      console.log(users);
      res.json({
        users: users
      });
    });
  },

  async createSector(req, res) {
    try {
      const sector = await Sector.create(req.body);
      res.send(sector);
    } catch (error) {
      res.status(500).send({
        error: "Błąd podczas dodawania nowego Sektora"
      });
    }
  },

  async createDuty(req, res) {
    try {
      const duty = await Duty.create(req.body);
      res.send(duty);
    } catch (error) {
      res.status(500).send({
        error: "Błąd podczas dodawania nowego Obowiązku"
      });
    }
  },

  async createSupplier(req, res) {
    try {
      const supplier = await Supplier.create(req.body);
      res.send(supplier);
    } catch (error) {
      res.status(500).send({
        error: "Błąd podczas dodawania nowego dostawcy"
      });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: ["id", "name", "surname", "sectorId", "dutyId"]
      });
      res.send(users);
    } catch (err) {
      res.status(400).send({
        error: "Blad podczas wyszukiwania uzytkownikow"
      });
    }
  },

  async getAllSectors(req, res) {
    try {
      const sectors = await Sector.findAll({});

      res.send(sectors);
    } catch (err) {
      res.status(400).send({
        error: "Blad podczas wyszukiwania sektorow"
      });
    }
  },

  async getAllDuties(req, res) {
    try {
      const duties = await Duty.findAll({});
      res.send(duties);
    } catch (err) {
      res.status(400).send({
        error: "Blad podczas wyszukiwania obowiazkow"
      });
    }
  },

  async changeUserSector(req, res) {
    try {
      await User.update(
        { sectorId: req.body.newSectorId },
        { where: { id: req.body.id } }
      );

      const users = await User.findAll({
        attributes: ["id", "name", "surname", "sectorId", "dutyId"]
      });

      res.send(users);
    } catch (error) {
      res.status(400).send({
        error: "Blad podczas zmiany sektora uzytkownika"
      });
    }
  },
  async changeUserDuty(req, res) {
    try {
      await User.update(
        { dutyId: req.body.newDutyId },
        { where: { id: req.body.id } }
      );

      const users = await User.findAll({
        attributes: ["id", "name", "surname", "sectorId", "dutyId"]
      });

      res.send(users);
    } catch (error) {
      res.status(400).send({
        error: "Blad podczas zmiany sektora uzytkownika"
      });
    }
  }
};
