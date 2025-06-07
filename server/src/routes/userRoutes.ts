import { Router, RequestHandler } from 'express';
import { registerUser, loginUser } from '../controllers/userController';

const router = Router();

router.post('/register', registerUser as RequestHandler);
router.post('/login', loginUser as RequestHandler);

export default router;