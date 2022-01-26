import { IWsClient } from 'interfaces';
import MessageModel from 'models/MessageModel';
import ChatModel from 'models/ChatModel';
import { IUser } from 'models/UserModel';
import { wsClients } from 'routes/WSRoute';

class MessageController {
  static async create(ws: IWsClient, chatId: string, text: string) {
    try {
      const message = await MessageModel.create({ user: ws.data?.id, chat: chatId, text: text });
      const chat = await ChatModel.findByIdAndUpdate(chatId, { $push: { messages: message.id } });

      const participantId = String(chat?.users.find((user) => String(user) !== ws.data?.id));
      const participant = wsClients.get(participantId);

      ws.send(JSON.stringify({ status: 'OK', data: message }));
      participant?.send(JSON.stringify({ event: 'message', data: message }));
    } catch (error) {
      ws.send(JSON.stringify({ status: 'ERROR', error }));
    }
  }
}

export default MessageController;
