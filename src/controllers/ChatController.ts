import { Request, Response } from 'express';
import { IWsClient, IWsClients } from 'interfaces';
import ChatModel from 'models/ChatModel';

class ChatController {
  static async create(ws: IWsClient, _: IWsClients, userId: string) {
    try {
      //@ts-ignore
      const existChat = await ChatModel.findOne({ users: { $eq: [ws.data.id, userId] } });
      if (existChat) {
        return ws.send(JSON.stringify({ status: 'EXIST', data: existChat }));
      }
      const chat = await ChatModel.create({ users: [ws.data?.id, userId] });
      ws.send(JSON.stringify({ status: 'OK', data: chat }));
    } catch (error) {
      ws.send(JSON.stringify({ status: 'ERROR', error }));
    }
  }
  static async getChats(req: Request, res: Response) {
    try {
      //@ts-ignore
      const chats = await ChatModel.find({ users: { $elemMatch: { $gte: req.user.id } } }).populate(
        'users',
      );
      res.status(200).json(chats);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default ChatController;
