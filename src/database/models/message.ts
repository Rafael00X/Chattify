import { Timestamp, ModelNames } from "@/types/mongoose";
import mongoose, { Schema, Types } from "mongoose";

interface IMessage extends Timestamp {
  text: string;
  image?: string;
  conversationRef: Types.ObjectId;
  userRef: Types.ObjectId;
}

const MessageSchema = new Schema<IMessage>(
  {
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    conversationRef: {
      type: Schema.Types.ObjectId,
      ref: ModelNames.CONVERSATION,
      required: true,
    },
    userRef: {
      type: Schema.Types.ObjectId,
      ref: ModelNames.USER,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model(ModelNames.MESSAGE, MessageSchema);
export default Message;
