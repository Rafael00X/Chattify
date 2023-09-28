import mongoose from "mongoose";

// export const connectMongoDb = async () => {
//   try {
//     const uri = process.env.MONGODB_URI || undefined;
//     if (!uri) throw new Error("MONGODB_URI not found");
//     await mongoose.connect(uri);
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.log(error);
//   }
// };

// import mongoose from 'mongoose';

declare global {
  var _mongooseConnectionPromise: Promise<typeof mongoose> | undefined;
}

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Add Mongo URI to .env.local");
}

let connectionPromise: Promise<typeof mongoose>;

// Check if the Node environment is in development
if (process.env.NODE_ENV === "development") {
  if (!global._mongooseConnectionPromise) {
    // Create a Mongoose connection and save it as a global variable
    global._mongooseConnectionPromise = mongoose.connect(uri);
  }
  connectionPromise = global._mongooseConnectionPromise;
} else {
  // Create a Mongoose connection
  connectionPromise = mongoose.connect(uri);
}

export default connectionPromise;
