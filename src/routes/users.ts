import { Router } from 'express';
import UserController from 'controllers/UserController';
import { checkAuth } from 'middlewares';

const usersRouter = Router();
usersRouter.use(checkAuth);
usersRouter.get('', UserController.get);

export default usersRouter;
