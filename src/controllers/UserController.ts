import { Request, Response } from 'express';
import { UserModel } from 'models';

interface RequestBody {
  username: string;
  email: string;
  password: string;
}

class UserController {
  async create(req: Request, res: Response) {
    try {
      const userData: RequestBody = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      };
      const user = new UserModel.create(userData);
      await user.save();
    } catch (error) {}
  }
}
