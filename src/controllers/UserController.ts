import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { UserModel } from 'models';
import TokenService from 'services/TokenService';

type RegisterBody = {
  username: string;
  email: string;
  password: string;
};

type LoginBody = {
  username: string;
  password: string;
};

class UserController {
  static async register(req: Request, res: Response) {
    try {
      await check('username').isLength({ min: 3 }).run(req);
      await check('email').isEmail().run(req);
      await check('password').isLength({ min: 8 }).run(req);

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const body: RegisterBody = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      };

      const existUser = await UserModel.findOne({
        $or: [{ username: body.username }, { email: body.email }],
      });

      if (existUser) {
        const existEmail: boolean = existUser.email === body.email;
        const existUsername: boolean = existUser.username === body.username;

        if (existEmail && existUsername) {
          return res.status(400).json({ msg: 'email and username is existed' });
        }

        if (existEmail) {
          return res.status(400).json({ msg: 'email is existed' });
        }

        return res.status(400).json({
          msg: 'username is existed',
        });
      }

      const user = await UserModel.create(body);

      const tokens = TokenService.generateUserTokens(user);

      res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
      res.status(200).json({ token: tokens.accessToken });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async login(req: Request, res: Response) {
    try {
      const body: LoginBody = {
        username: req.body.username,
        password: req.body.password,
      };

      const user = await UserModel.findOne({ username: body.username });
      if (!user) {
        return res.status(400).json({ msg: 'invalid username or password' });
      }

      if (!user.isCorrectPassword(body.password)) {
        return res.status(400).json({ msg: 'invalid username or password' });
      }

      const tokens = TokenService.generateUserTokens(user);
      res.cookie('_chat-refresh', tokens.refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ token: tokens.accessToken });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async me(req: Request, res: Response) {
    try {
      const user = await UserModel.findById(req.user?.id).select('-password');
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async get(req: Request, res: Response) {
    try {
      const { search = '' } = req.query as { search?: string };
      const users = await UserModel.find({
        $and: [{ username: new RegExp(search, 'i') }, { _id: { $ne: req.user?.id } }],
      }).select('-parssword');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default UserController;
