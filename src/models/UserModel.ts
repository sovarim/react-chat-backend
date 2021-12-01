import { Schema, Document, model } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  lastVisit?: Date;
}

interface IUserModel extends IUser {
  isCorrectPassword(password: string): boolean;
}

const UserSchema = new Schema<IUser>(
  {
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
  },
  {
    timestamps: true,
  },
);

UserSchema.pre<IUser>('save', function (next) {
  this.password = hashSync(this.password, 10);
  next();
});

UserSchema.methods.isCorrectPassword = function (password: string) {
  return compareSync(password, this.password);
};

const UserModel = model<IUserModel>('User', UserSchema);

export default UserModel;
