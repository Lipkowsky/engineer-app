const Joi = require("joi");

module.exports = {
  register(req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{6,32}$")),
      name: Joi.string(),
      surname: Joi.string(),
      role: Joi.string(),
      sectorId: Joi.number().integer(),
      dutyId: Joi.number().integer()
    };

    const { error } = Joi.validate(req.body, schema);

    if (error) {
      switch (error.details[0].context.key) {
        case "email":
          res.status(400).send({
            error: "Podany e-mail nie jest prawidłowy"
          });
          break;
        case "password":
          res.status(400).send({
            error: `Hasło powinno zawierać conajmniej 6 znaków:
            `
          });
          break;
        default:
          res.status(400).send({
            error: "Niewłaścliwe informacje rejestracyjne"
          });
      }
    } else {
      next();
    }
  }
};
