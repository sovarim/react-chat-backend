import { Router } from 'express';
import UserController from 'controllers/UserController';
import { checkAuth } from 'middlewares';

const authRouter = Router();

authRouter.post('/register', UserController.register);
authRouter.post('/login', UserController.login);
authRouter.get('/me', checkAuth, UserController.me);

export default authRouter;
