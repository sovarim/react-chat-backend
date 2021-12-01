import { Schema, Document, model } from 'mongoose';
import { hashSync } from 'bcrypt';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  lastVisit?: Date;
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

const UserModel = model<IUser>('User', UserSchema);

export default UserModel;
