import { IWsClient, IRequest, WsEvents, WsEventType, IWsClients } from 'interfaces';
import { WebSocketServer } from 'ws';
import ChatController from 'controllers/ChatController';
import MessageController from 'controllers/MessageController';

class WSRoute {
  private _wsServer: WebSocketServer;
  private _wsClients: IWsClients;

  constructor(wsServer: WebSocketServer) {
    this._wsServer = wsServer;
    this._wsClients = {};
    this._createEventListeners();
  }

  private _createEventListeners(): void {
    this._wsServer.on('connection', (ws: IWsClient, req: IRequest) => {
      ws.data = req.jwtData;
      ws.token = req.token;

      if (Array.isArray(this._wsClients[ws.data.id])) {
        this._wsClients[ws.data.id].push(ws);
      } else {
        this._wsClients[ws.data.id] = [ws];
      }

      ws.send('connection success');

      ws.on('message', (msg) => {
        const _msg: WsEventType = JSON.parse(msg.toString());

        switch (_msg.event) {
          case WsEvents.createChat:
            ChatController.create(ws, this._wsClients, _msg.userId);
            break;
          case WsEvents.message:
            MessageController.create(ws, this._wsClients, _msg.chatId, _msg.text);
          default:
            break;
        }
      });
    });
  }
}

export default WSRoute;
