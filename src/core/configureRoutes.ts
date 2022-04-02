import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import authRoute from 'routes/auth';
import configureWebSocketServer from 'core/configureWebSocketServer';
import TokenService from 'services/TokenService';

export default (app: Express) => {
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
    console.log(`Server runned on PORT: ${process.env.PORT || 8001}`);
  });
};
