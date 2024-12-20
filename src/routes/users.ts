import {Router} from 'express';

import {register, login, getUser} from '../controllers/usersController';
import {authenticate} from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', authenticate, getUser);

export default router;