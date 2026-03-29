import mongoose from "mongoose";

const connectionStr = process.env.MONGO_URI;

if (!connectionStr) {
  throw new Error("Connection string is missing in .env");
}

const cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) {
    console.log("Connection already existed.");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Connecting to DB");
    cached.promise = mongoose.connect(connectionStr as string);
  }

  cached.conn = await cached.promise;
  console.log("Connected to DB");
  return cached.conn;
}

(global as any).mongoose = cached;
