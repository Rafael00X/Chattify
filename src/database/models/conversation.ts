import { Timestamp, ModelNames } from "@/types/mongoose";
import mongoose, { Schema, Types } from "mongoose";

interface IConversation extends Timestamp {
  name: string;
  isGroup: boolean;
  image?: string;
  userRefs: Types.ObjectId[];
  messageRefs: Types.ObjectId[];
}

const conversationSchema = new Schema<IConversation>(
  {
    name: {
      type: String,
      required: true,
    },
    isGroup: {
      type: Boolean,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    userRefs: [
      {
        type: Schema.Types.ObjectId,
        ref: ModelNames.USER,
        required: true,
      },
    ],
    messageRefs: [
      {
        type: Schema.Types.ObjectId,
        ref: ModelNames.MESSAGE,
        required: true,
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Conversation = mongoose.model(
  ModelNames.CONVERSATION,
  conversationSchema
);
export default Conversation;
