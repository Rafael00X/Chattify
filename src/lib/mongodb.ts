import mongoose from "mongoose";

export const connectMongoDb = async () => {
  try {
    const uri = process.env.MONGODB_URI || undefined;
    if (!uri) throw new Error("MONGODB_URI not found");
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
