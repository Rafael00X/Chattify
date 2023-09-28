import mongoose from "mongoose";

declare global {
  var _mongooseConnectionPromise: Promise<typeof mongoose> | undefined;
}

const uri = process.env.MONGODB_URI;
if (!uri)
  throw new Error("Failed to load MongoDB connection uri from .env.local");

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
