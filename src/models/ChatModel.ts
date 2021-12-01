import { Schema, Document, model, PopulatedDoc } from 'mongoose';
import { IMessage } from './MessageModel';
import { IUser } from './UserModel';

interface IChat extends Document {
  users: PopulatedDoc<IUser>;
  messages: PopulatedDoc<IMessage>;
  lastMessage: PopulatedDoc<IMessage>;
}

const ChatSchema = new Schema<IChat>({
  users: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    required: true,
    max: 2,
  },
  messages: {
    type: [Schema.Types.ObjectId],
    ref: 'Message',
  },
  lastMessage: {
    type: [Schema.Types.ObjectId],
    ref: 'Message',
  },
});

const ChatModel = model<IChat>('Chat', ChatSchema);

export default ChatModel;
