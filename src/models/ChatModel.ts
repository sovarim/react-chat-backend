import { Schema, Document, model, ObjectId } from 'mongoose';

export interface IChat extends Document {
  users: ObjectId[];
  messages: ObjectId;
  lastMessage: ObjectId;
}

const ChatSchema = new Schema<IChat>({
  users: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    required: true,
    validate: (arr: []) => arr.length <= 2,
  },

  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
  lastMessage: {
    type: Schema.Types.ObjectId,
    ref: 'Message',
  },
});

const ChatModel = model<IChat>('Chat', ChatSchema);

export default ChatModel;
