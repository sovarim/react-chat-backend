import * as ws from '@types/ws';

declare namespace WebSocket {
  export type WebSocket = { token?: string };
}
