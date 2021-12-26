import { WebSocketServer } from 'ws';
import { Server } from 'http';
import { IWsVerify, IWsClient, IRequest } from 'interfaces';
import URLParse from 'url-parse';
import TokenService from 'services/TokenService';

export default (server: Server) => {
  const wsServer = new WebSocketServer({
    server,
    verifyClient: (info: IWsVerify, done) => {
      const params = URLParse(info.req.url as string, true).query;
      const { decodedJwt, error } = TokenService.verify(params.token as string);
      if (error) {
        return done(false, 401);
      }
      info.req.jwtData = decodedJwt.data;
      info.req.token = params.token;
      done(true);
    },
  });

  wsServer.on('connection', (ws: IWsClient, req: IRequest) => {
    ws.data = req.jwtData;
    ws.token = req.token;
    ws.send('hello');
  });
};
