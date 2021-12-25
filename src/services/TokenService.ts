import jwt from 'jsonwebtoken';
import { IUser } from 'models/UserModel';

class TokenService {
  static generateUserTokens(user: IUser) {
    const _user: { id: string; username: string; email: string } = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const accessToken: string = this.createToken(_user, process.env.ACCESS_EXPIRATION as string);
    const refreshToken: string = this.createToken(_user, process.env.REFRESH_EXPIRATION as string);

    return {
      accessToken,
      refreshToken,
    };
  }

  static createToken(data: {}, expiresIn: string) {
    return jwt.sign(
      {
        data,
      },
      process.env.JWT_KEY as string,
      {
        expiresIn,
        algorithm: 'HS256',
      },
    );
  }

  static verify(token: string): { decodedJwt: any; error: any } {
    try {
      const decodedJwt = jwt.verify(token, process.env.JWT_KEY as string);
      return { decodedJwt, error: null };
    } catch (error) {
      return { decodedJwt: null, error };
    }
  }
}

export default TokenService;
