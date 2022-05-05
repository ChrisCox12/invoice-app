import express from 'express';
import { getAllUsers, loginUser, createUser } from '../controllers/user.js';
import { validateToken } from '../middleware/validateToken.js';

const router = express.Router();

router.get('/', validateToken, getAllUsers);


router.post('/register', createUser);
router.post('/login', loginUser);


export default router;