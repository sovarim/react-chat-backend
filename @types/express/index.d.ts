import { Express } from 'express';
declare namespace Express {
  import { IJwt } from '../../src/interfaces';
  interface Request {
    user: IJwt;
  }
}
declare module 'express-serve-static-core' {
  import { IJwt } from '../../src/interfaces';
  export interface Request {
    user: IJwt;
  }
}
