import { WebSocketServer } from 'ws';
import { Server } from 'http';
import { IWsVerify } from 'interfaces';
import URLParse from 'url-parse';
import TokenService from 'services/TokenService';
import WS from 'routes/ws';

export let ws: WS;

export default (server: Server) => {
  const wsServer = new WebSocketServer({
    server,
    //@ts-ignore
    verifyClient: (info: IWsVerify, done) => {
      const token: string = URLParse(info.req.url as string, true).query.token || '';
      const { decodedJwt, error } = TokenService.verify(token);
      if (error) {
        return done(false, 401);
      }
      info.req.jwtData = decodedJwt.data;
      info.req.token = token;
      done(true);
    },
  });
  ws = new WS(wsServer);
};
