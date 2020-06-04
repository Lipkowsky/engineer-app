const User = require("../models/User");
const Duty = require("../models/Duties");
const Sector = require("../models/Sectors");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require("bcryptjs");

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  });
}

module.exports = {
  async register(req, res) {
    try {
      const salt = await bcrypt.genSalt(8);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = {
        email: req.body.email,
        password: hashPassword,
        name: req.body.name,
        surname: req.body.surname,
        role: req.body.role,
        sectorId: req.body.sectorId,
        dutyId: req.body.dutyId
      };

      const user = await User.create(newUser);
      res.send(user.toJSON());
    } catch (err) {
      res.status(400).send({
        error: "Ten e-mail jest już w użyciu."
      });
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email: email
        }
      });

      if (!user) {
        return res.status(403).send({
          error: "Podane dane są niewłaściwe"
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(403).send({
          error: "Podane dane są niewłaściwe"
        });
      }

      const userJson = user.toJSON();
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      });
    } catch (err) {
      res.status(500).send({
        error: "Problem logowania do aplikacji"
      });
    }
  },

  async getUserDuty(req, res) {
    try {
      const { id } = req.body;
      const userDuty = await User.findOne({
        attributes: ["name", "surname"],
        include: [
          {
            model: Duty,
            required: true
          }
        ],
        where: {
          id: id
        }
      });
      res.send(userDuty.toJSON());
    } catch (err) {
      res.status(400).send({
        error: err
      });
    }
  },

  async getUserSector(req, res) {
    try {
      const { id } = req.body;
      const userSector = await User.findOne({
        attributes: ["name", "surname"],
        include: [
          {
            model: Sector,
            required: true
          }
        ],
        where: {
          id: id
        }
      });
      res.send(userSector.toJSON());
    } catch (err) {
      res.status(400).send({
        error: err
      });
    }
  }
};
