import { Timestamp, ModelNames } from "@/types/mongoose";
import mongoose, { Schema, Types } from "mongoose";

interface IUser extends Timestamp {
  name: string;
  email: string;
  image?: string;
  conversationRefs: Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    image: {
      type: String,
      required: false,
    },
    conversationRefs: [
      {
        type: Schema.Types.ObjectId,
        ref: ModelNames.CONVERSATION,
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model(ModelNames.USER, userSchema);
export default User;
