import { IWsClient, IRequest, WsEvents, WsEventType } from 'interfaces';
import { WebSocketServer } from 'ws';
import ChatController from 'controllers/ChatController';
import MessageController from 'controllers/MessageController';

export const wsClients: Map<string, IWsClient> = new Map();

class WSRoute {
  private _wsServer: WebSocketServer;

  constructor(wsServer: WebSocketServer) {
    this._wsServer = wsServer;
    this._createEventListeners();
  }

  private _createEventListeners(): void {
    this._wsServer.on('connection', (ws: IWsClient, req: IRequest) => {
      ws.data = req.jwtData;
      ws.token = req.token;
      wsClients.set(ws.data.id, ws);
      ws.send('connection success');

      ws.on('message', (msg) => {
        const _msg: WsEventType = JSON.parse(msg.toString());

        switch (_msg.event) {
          case WsEvents.createChat:
            ChatController.create(ws, _msg.userId);
            break;
          case WsEvents.message:
            MessageController.create(ws, _msg.chatId, _msg.text);
          default:
            break;
        }
      });
    });
  }
}

export default WSRoute;
