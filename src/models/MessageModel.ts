import { Schema, Document, model, ObjectId } from 'mongoose';

export interface IMessage extends Document {
  user: ObjectId;
  chat: ObjectId;
  text: string;
}

const MessageSchema = new Schema<IMessage>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
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
