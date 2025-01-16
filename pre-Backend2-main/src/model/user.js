const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true }, // Será un hash
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Carts' }, // Referencia al carrito
    role: { type: String, default: 'user' }
});

// Middleware para encriptar contraseña antes de guardar
userSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();
    this.password = bcrypt.hashSync(this.password, 10); // HashSync con saltRounds = 10
    next();
});

// Comparar contraseña
userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;