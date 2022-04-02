import './core/config';
import express from 'express';
import { dbconnect } from 'core/database';
import configureRoutes from 'core/configureRoutes';

dbconnect();
const app = express();
configureRoutes(app);
