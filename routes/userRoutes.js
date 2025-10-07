import express from 'express';
import { getUsers, Login, Signup } from '../controllers/authControllers.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/getuser",authMiddleware, getUsers);


export default router;