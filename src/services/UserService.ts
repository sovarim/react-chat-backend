import { UserModel } from 'models';
import { hashSync } from 'bcrypt';

interface IUserData {
  username: string;
  email: string;
  password: string;
}

class UserService {
  static async create(userData: IUserData) {
    try {
      const user = new UserModel(userData);
      
    } catch (err) {}
  }
}
