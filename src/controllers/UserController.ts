import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { UserModel } from 'models';

type RegisterBody = {
  username: string;
  email: string;
  password: string;
};

class UserController {
  async register(req: Request, res: Response) {
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

      const accessToken = jwt.sign(
        {
          data: {
            id: user._id,
            username: user.username,
            email: user.email,
          },
        },
        process.env.JWT_KEY as string,
        {
          expiresIn: process.env.ACCESS_EXPIRATION,
          algorithm: 'HS256',
        },
      );
      res.cookie('refreshToken', accessToken, { httpOnly: true });
      res.status(200).json({ accessToken });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new UserController();
