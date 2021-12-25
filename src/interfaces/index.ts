import { IncomingMessage } from 'http';
import { WebSocket } from 'ws';

export interface IJwt {
  id: string;
  username: string;
  email: string;
}

export interface IRequest extends IncomingMessage {
  jwtData?: IJwt;
  token?: string;
}

export interface IWsClient extends WebSocket {
  data?: IJwt;
  token?: string;
}

export interface IWsVerify {
  origin: string;
  secure: boolean;
  req: IRequest;
}
