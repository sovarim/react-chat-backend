import { Router } from 'express';
import UserController from 'controllers/UserController';

import passport from 'passport';
import PassportJwt from 'passport-jwt';

passport.use(
  new PassportJwt.Strategy(
    {
      secretOrKey: process.env.JWT_KEY,
      jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.data);
      } catch (error) {
        done(error);
      }
    },
  ),
);

const authRouter = Router();

authRouter.use(passport.initialize());

authRouter.post('/register', UserController.register);
authRouter.post('/login', UserController.login);
authRouter.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log(req);
  res.send('hello');
});

export default authRouter;
