import { StatusCodes as STATUS } from 'http-status-codes';
import passport from 'passport';

const authenticateJWT = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(STATUS.UNAUTHORIZED).json({ message: 'ابتدا به حساب کاربری خود وارد شوید' });
        }
        req.user = user;
        next();
    })(req, res, next);
};

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(STATUS.FORBIDDEN).json({ message: 'شما به این مسیر دسترسی ندارید' });
        }
        next();
    };
};
export { authenticateJWT, authorizeRoles };
