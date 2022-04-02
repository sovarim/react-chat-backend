import { NextFunction, Request, Response } from 'express';
import { parseBearer } from 'helpers';
import TokenService from 'services/TokenService';

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const invalidMsg = 'invalid token';
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ msg: invalidMsg });
  }

  const bearerToken = parseBearer(token);
  if (!bearerToken) {
    return res.status(401).json({ msg: invalidMsg });
  }

  const { decodedJwt, error } = TokenService.verify(bearerToken);
  if (error) {
    return res.status(401).json({ msg: invalidMsg });
  }
  //@ts-ignore
  req.user = decodedJwt.data;
  next();
};

export default checkAuth;
