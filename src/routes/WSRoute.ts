import { IWsClient, IRequest } from 'interfaces';
import { WebSocketServer } from 'ws';

class WSRoute {
  private _wsServer: WebSocketServer;

  constructor(wsServer: WebSocketServer) {
    this._wsServer = wsServer;
    this._createRoutes();
  }

  private _createRoutes(): void {
    this._wsServer.on('connection', (ws: IWsClient, req: IRequest) => {
      ws.data = req.jwtData;
      ws.token = req.token;
      ws.send('hello');
    });
  }
}

export default WSRoute;
