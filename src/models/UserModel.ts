import { Schema, model } from 'mongoose';

interface IUser {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  lastVisit?: Date;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: String,
  lastVisit: {
    type: Date,
    default: new Date(),
  },
});

const UserModel = model<IUser>('User', UserSchema);

export default UserModel;
