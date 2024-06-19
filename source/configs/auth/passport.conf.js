import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { models } from '../database/postgres.conf.js';
import { config } from 'dotenv';
config()



export const passportConfig = (passport) => {
    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET_KEY
    }, async (jwt_payload, done) => {
        try {
            const user = await models.User.findByPk(jwt_payload.id);
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        } catch (error) {
            return done(error, false);
        }
    }));
}

