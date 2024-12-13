const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('./User'); 
require('dotenv').config(); 

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => req?.cookies?.token 
  ]),
  secretOrKey: process.env.JWT_SECRET || 'mi_secreto',
};

passport.use(
  'jwt',
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
    
      const user = await User.findById(jwtPayload.id);
      if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' });
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);


passport.use(
  'current',
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.id);
      if (!user) {
        return done(null, false, { message: 'Usuario no autenticado' });
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

module.exports = passport;