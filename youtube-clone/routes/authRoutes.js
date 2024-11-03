// routes/authRoutes.js
import express from 'express';
import { register, login, getUserById } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/:id', getUserById);


export default router;

