import { IJwt } from './interfaces';

declare global {
  namespace Express {
    interface Request {
      user?: IJwt;
    }
  }
}
