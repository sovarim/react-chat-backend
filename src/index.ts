import './core/config';
import { createServer } from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { WebSocketServer } from 'ws';
import { dbconnect } from 'core/database';
import authRouter from 'routes/auth';
import urlParse from 'url-parse';
import TokenService from 'services/TokenService';
import { IWsVerify, IRequest, IWsClient } from 'interfaces';
const app = express();

dbconnect();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(cors());
app.use(cookieParser());
app.use('/auth', authRouter);

const server = createServer(app);
const wsServer = new WebSocketServer({
  server,
  verifyClient: (info: IWsVerify, done) => {
    const params = urlParse(info.req.url as string, true).query;
    const { decodedJwt, error } = TokenService.verify(params.token as string);
    if (error) {
      done(false, 401);
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

server.listen(process.env.PORT, () => {
  console.log(`Server runned on PORT: ${process.env.PORT}`);
});
