const passport = require('./passportConfig');

const isAuthenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'No autorizado' });

    req.user = user;
    next();
  })(req, res, next);
};

module.exports = { isAuthenticated };