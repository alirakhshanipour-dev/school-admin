import express from 'express';
import { UserService } from '../services/auth/user.service.js';
import { authenticateJWT } from '../middlewares/authenticateUser.js';

const router = express.Router();

router.post('/register', UserService.register);

router.post('/login', UserService.login);

router.get('/protected', authenticateJWT, (req, res) => {
    res.status(200).json({ message: 'You are authenticated', user: req.user });
});

export { router as AuthRouter }
