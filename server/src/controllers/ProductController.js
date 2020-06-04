const Product = require("../models/Products");
const Supplier = require("../models/Suppliers");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const nodemailer = require("nodemailer");
const Joi = require("joi");

module.exports = {
  async createProduct(req, res) {
    const schema = Joi.object().keys({
      name: Joi.string()
        .min(1)
        .max(30)
        .required(),
      pieces: Joi.number().required(),
      price: Joi.number().required(),
      barcode_NO: Joi.string().min(13).max(13).required(),
      brand_name: Joi.string().min(1).required(),
      sectorId: Joi.number().required(),
      supplierId: Joi.number().required()
    });

    try {
      const result = await Joi.validate(req.body, schema);

      const { error } = result;
      const valid = error == null;

      if (!valid) {
        res.status(422).json({
          message: "Nieprawidłowe zapytanie"
        });
      } else {
        const product = await Product.create(req.body);
        res.send(product);
      }
    } catch (error) {
      res.status(500).send({
        error: error
      });
    }
  },

  async allProducts(req, res) {
    try {
      const products = await Product.findAll({});
      res.send(products);
    } catch (error) {
      res.status(500).send({
        error: "Błąd podczas wyswietlania wszystkich produktow"
      });
    }
  },

  async takePiecesOfProduct(req, res) {
    try {
      await Product.update(
        { pieces: req.body.pieces - req.body.inBasket },
        { where: { id: req.body.id } }
      );
    } catch (err) {
      res.status(500).send({
        error: "Błąd podczas zabierania sztuki"
      });
    }

    try {
      const products = await Product.findAll({});
      res.send(products);
    } catch (error) {
      res.status(500).send({
        error: "Błąd podczas wyswietlania wszystkich produktow"
      });
    }
  },

  async addPiecesOfProduct(req, res) {
    try {
      await Product.update(
        { pieces: req.body.pieces + req.body.howManyToAdd },
        { where: { id: req.body.id } }
      );
    } catch (err) {
      res.status(500).send({
        error: "Błąd podczas dodawania sztuki"
      });
    }

    try {
      const products = await Product.findAll({});
      res.send(products);
    } catch (error) {
      res.status(500).send({
        error: "Błąd podczas wyswietlania wszystkich produktow"
      });
    }
  },

  async deleteProduct(req, res) {
    try {
      await Product.destroy({
        where: { id: req.body.id }
      });
    } catch (error) {
      res.status(500).send({
        error: "Błąd podczas usuwania produktu"
      });
    }

    try {
      const products = await Product.findAll({});
      res.send(products);
    } catch (error) {
      res.status(500).send({
        error: "Błąd podczas wyswietlania wszystkich produktow"
      });
    }
  },

  async checkIsEnoughProducts(req, res) {
    try {
      const productsWherePiecesLessThan10 = await Product.findAll({
        include: [
          {
            model: Supplier,
            required: true
          }
        ],
        where: { pieces: { [Op.lte]: 10 } }
      });

      res.send(productsWherePiecesLessThan10);
    } catch (error) {
      res.status(500).send({
        error: "Błąd podczas wyswietlania wszystkich produktow"
      });
    }
  },


  async changeProductSector(req, res) {
    try {
      await Product.update(
        { sectorId: req.body.newSectorId },
        { where: { id: req.body.id } }
      );

      const products = await Product.findAll({});

      res.send(products);
    } catch (error) {
      res.status(400).send({
        error: "Blad podczas zmiany sektora produktu"
      });
    }
  },

  async sendEmail(req, res) {
    const idOfProduct = req.body.idOfProduct;
    const addressee = req.body.addressee;
    const subject = req.body.subject;
    const text = req.body.text;

    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "USER_NAME",
        pass: "PASSWORD"
      }
    });

    var mailOptions = {
      from: "EMAIL_FROM",
      to: addressee,
      subject: subject,
      text: text
    };

    await transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        res.status(500).send({
          error: error
        });
      } else {
        console.log("Email sent: " + info.response);
        const today = new Date().toLocaleString();

        try {
          Product.update(
            { date_of_contact: today },
            { where: { id: idOfProduct } }
          );
          res.send(today);
        } catch (error) {
          res.status(400).send({
            error: "Blad podczas dodawania daty wysylki wiadomosci"
          });
        }
      }
    });
  }
};
