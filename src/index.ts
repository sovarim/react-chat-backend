import './core/config';
import { createServer } from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { WebSocketServer } from 'ws';
import { dbconnect } from 'core/database';
import authRouter from 'routes/auth';

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
const wsServer = new WebSocketServer({ server });

wsServer.on('connection', (ws, req) => {
  console.log(req);
  ws.send('hello');
});

server.listen(process.env.PORT, () => {
  console.log(`Server runned on PORT: ${process.env.PORT}`);
});
