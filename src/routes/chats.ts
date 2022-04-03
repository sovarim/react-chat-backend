import { Router } from 'express';
import ChatController from 'controllers/ChatController';
import { checkAuth } from 'middlewares';

const authRouter = Router();
authRouter.use(checkAuth);
authRouter.get('', ChatController.getChats);

export default authRouter;
