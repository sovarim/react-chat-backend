import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
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

      const existUsername = await UserModel.findOne({ username: body.username });
      if (existUsername) {
        return res.status(400).json({ msg: 'Пользователь с таким именем уже существует!' });
      }

      const existEmail = await UserModel.findOne({ email: body.email });
      if (existEmail) {
        return res.status(400).json({ msg: 'Пользователь с таким email уже существует!' });
      }

      const user = await UserModel.create(body);
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new UserController();
