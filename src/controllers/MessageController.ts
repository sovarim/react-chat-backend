import { IWsClient } from 'interfaces';
import MessageModel from 'models/MessageModel';
import ChatModel from 'models/ChatModel';
import { IUser } from 'models/UserModel';

class MessageController {
  static async create(ws: IWsClient, chatId: string, text: string) {
    try {
      const message = await MessageModel.create({ user: ws.data?.id, chat: chatId, text: text });
      const chat = await ChatModel.findById(chatId);
      const participantId = String(chat?.users.find((user) => String(user) !== ws.data?.id));
      ws.send(JSON.stringify({ status: 'OK', data: message }));
      ws.emit('new-message', participantId, message);
    } catch (error) {
      ws.send(JSON.stringify({ status: 'ERROR', error }));
    }
  }
}

export default MessageController;
