const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../model/user');
const router = express.Router();

const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, 'secretKey123', { expiresIn: '1h' });
};

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !user.comparePassword(password)) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const token = generateToken(user);
        res.cookie('token', token, { httpOnly: true });
        res.json({ message: 'Login exitoso', token });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
});

// Ruta /current (verifica usuario logueado)
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;