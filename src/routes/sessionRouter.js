const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../model/user');
const userDto = require('../dtos/user.dto');
const userDto = require('../dtos/user.dto');
const authorize = require('../middlewares/authorize');
const router = express.Router();

const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, 'secretKey123', { expiresIn: '1h' });
};


//LOGIN
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
// Ruta /products crea producto (solo admin)
router.post('/products', passport.authenticate('jwt',{session:false}),
authorize([admin]),
(req, res)=>{
    res.status(201).json({message:'producto creado con exito'})
},)

// Actuliza producto solo admin
router.put('/products/:id', passport.authenticate('jwt', {session:false}),
authorize([admin]),
(req, res) =>{
    res.json({message:'producto actualizado con exito'})
})

// Eliminar producto solo admin
router.delete(
    '/products/:id',
    passport.authenticate('jwt', {session:false}),
    authorize([admin]),
    (req, res) => {
        res.json({message:'producto eliminado con exito'})
    }
)
// Agregar ´productos al carrito
router.post(
    '/cart',
    passport.authenticate('jwt', {session:false}),
    authorize([user]),
    (req, res) => {
        res.json({message:'Producto agregado con exito'});
    }
)

// Ruta /current (verifica usuario logueado)
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    const userDto = new userDto(req.user)
    
    res.json(userDto);
});

module.exports = router;