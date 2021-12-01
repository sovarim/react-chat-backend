import { Schema, Document, model, PopulatedDoc } from 'mongoose';
import { IUser } from './UserModel';

export interface IMessage extends Document {
  user: PopulatedDoc<IUser>;
  text: string;
}

const MessageSchema = new Schema<IMessage>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: String,
  },
  {
    timestamps: true,
  },
);

const MessageModel = model<IMessage>('Message', MessageSchema);

export default MessageModel;
