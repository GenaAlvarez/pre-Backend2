const express = require('express');
const passport = require('./passportConfig');
const { generateToken } = require('./jwtUtils');
const { isAuthenticated } = require('./authMiddleware');
const cookieParser = require('cookie-parser');

const router = express.Router();

router.use(cookieParser());

const User = require('./User');


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }


    const token = generateToken(user);

    res.cookie('token', token, { httpOnly: true, secure: true });
    return res.json({ message: 'Login exitoso', token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get('/current', isAuthenticated, (req, res) => {
  return res.json({ user: req.user });
});

module.exports = router;