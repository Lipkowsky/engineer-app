const passport = require('passport')

module.exports = function (req, res, next) {
  passport.authenticate('jwt', function (err, user) {
    if (err || !user || user.role !== 'admin') {
      res.status(403).send({
        error: 'nie masz uprawnień do przeglądania tej strony',
      })
    } else {
      req.user = user
      next()
    }
  })(req, res, next)
}


