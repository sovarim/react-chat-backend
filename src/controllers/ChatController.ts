import { IWsClient } from 'interfaces';
import ChatModel from 'models/ChatModel';

class ChatController {
  static async create(ws: IWsClient, userId: string) {
    try {
      const existChat = await ChatModel.findOne({ users: { $elemMatch: { $gte: userId } } });
      if (existChat) {
        return ws.send(JSON.stringify({ status: 'EXIST', data: existChat }));
      }
      const chat = await ChatModel.create({ users: [ws.data?.id, userId] });
      ws.send(JSON.stringify({ status: 'OK', data: chat }));
    } catch (error) {
      ws.send(JSON.stringify({ status: 'ERROR', error }));
    }
  }
}

export default ChatController;
