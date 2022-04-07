import { IWsClient, IWsClients } from 'interfaces';
import MessageModel from 'models/MessageModel';
import ChatModel from 'models/ChatModel';
import { Request, Response } from 'express';
class MessageController {
  static async create(ws: IWsClient, wsClients: IWsClients, chatId: string, text: string) {
    try {
      const message = await MessageModel.create({ user: ws.data?.id, chat: chatId, text: text });
      const chat = await ChatModel.findByIdAndUpdate(chatId, {
        $push: { messages: message.id },
        lastMessage: message.id,
      });

      const participantId = String(chat?.users.find((user) => String(user) !== ws.data?.id));

      // отправка сообщения собеседнику для всех устройств авторизованных под этим аккаунтом
      if (wsClients[participantId]) {
        wsClients[participantId].forEach((wsClient) =>
          wsClient.send(JSON.stringify({ event: 'message', data: message })),
        );
      }
      // отправка сообщения самому отправителю для всех устройств авторизованных под этим аккаунтом
      if (wsClients[ws.data?.id]) {
        wsClients[ws.data?.id].forEach((wsClient) =>
          wsClient.send(JSON.stringify({ event: 'message', data: message })),
        );
      }
    } catch (error) {
      ws.send(JSON.stringify({ status: 'ERROR', error }));
    }
  }
  static async get(req: Request, res: Response) {
    try {
      const params = req.params as { id: string };
      const chat = await ChatModel.findById(params.id);
      if (chat && chat.users.includes(req.user.id)) {
        const messages = await MessageModel.find({ chat: params.id as any });
        return res.status(200).json(messages);
      }
      res.status(403).json({ msg: 'Forbidden' });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default MessageController;
