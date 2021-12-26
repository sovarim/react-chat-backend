import './core/config';
import { createServer } from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { dbconnect } from 'core/database';
import authRoute from 'routes/authRoute';
import configureWebSocketServer from 'core/configureWebSocketServer';

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
app.use('/auth', authRoute);

const server = createServer(app);
configureWebSocketServer(server);

server.listen(process.env.PORT || 8001, () => {
  console.log(`Server runned on PORT: ${process.env.PORT}`);
});
