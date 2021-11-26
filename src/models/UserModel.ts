import { Schema, Document, model } from 'mongoose';

interface IUser extends Document {
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
    min: [3, 'username must be at least 6 characters'],
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

UserSchema.pre('save', (next) => {
  next();
});

const UserModel = model<IUser>('User', UserSchema);

export default UserModel;
