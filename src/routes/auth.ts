import { Router } from 'express';
import { checkToken } from '../controllers/authController';

const router = Router();

router.get('/check-token', checkToken);
export default router;