const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../model/user');
const cookieExtractor = (req) => req?.cookies?.token || null;

const jwtOptions = {
    jwtFromRequest: cookieExtractor, // Extrae el token de las cookies
    secretOrKey: 'secretKey123' // Cambia esto por una clave secreta fuerte
};

// Estrategia de JWT para validar el token
passport.use('jwt', new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);
        if (!user) return done(null, false);
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
}));

module.exports = passport;