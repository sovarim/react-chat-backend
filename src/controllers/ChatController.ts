import { Request, Response } from 'express';
import { IWsClient, IWsClients } from 'interfaces';
import ChatModel from 'models/ChatModel';
import { ws } from 'core/configureWebSocketServer';
class ChatController {
  static async create(req: Request, res: Response) {
    try {
      const { userId } = req.body as { userId: string };
      const existChat = await ChatModel.findOne({ users: { $eq: [req.user.id, userId] } })
        .select('-messages')
        .populate('users', '-password')
        .populate('lastMessage');
      if (existChat) {
        return res.status(201).json(existChat);
      }
      let chat = await ChatModel.create({ users: [req.user.id, userId] });
      chat = await chat.populate('users', '-password');
      return res.status(201).json(chat);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async getChats(req: Request, res: Response) {
    try {
      const chats = await ChatModel.find({
        users: { $in: [req.user.id] },
        messages: { $exists: true, $not: { $size: 0 } },
      })
        .select('-messages')
        .populate('users', '-password')
        .populate('lastMessage');

      res.status(200).json(chats);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default ChatController;
