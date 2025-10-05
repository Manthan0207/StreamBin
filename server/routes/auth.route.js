import express from 'express';
import { login, signup, checkAuth } from '../controllers/auth.controller.js';
import verifyToken from '../middlewares/verifyToken.js';



const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/checkAuth', verifyToken, checkAuth);



export default router;