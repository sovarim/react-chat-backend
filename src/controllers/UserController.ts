import { Request, Response } from 'express';
import { UserModel } from 'models';

type RegisterBodyType = {
  username: string;
  email: string;
  password: string;
};

class UserController {
  async register(req: Request, res: Response) {
    try {
      const registerBody: RegisterBodyType = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      };
      const user = new UserModel(registerBody);
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new UserController();
