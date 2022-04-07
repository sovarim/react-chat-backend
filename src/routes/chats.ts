import { Router } from 'express';
import ChatController from 'controllers/ChatController';
import MessageController from 'controllers/MessageController';
import { checkAuth } from 'middlewares';

const chatRouter = Router();
chatRouter.use(checkAuth);
chatRouter.get('', ChatController.getChats);
chatRouter.post('/create', ChatController.create);
chatRouter.get('/:id', ChatController.get);
chatRouter.get('/:id/messages', MessageController.get);

export default chatRouter;
