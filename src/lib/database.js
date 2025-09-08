 
import mongoose from "mongoose";

const DB_URL = process.env.MONGODB_URI;

 

if (!DB_URL) {
  throw new Error("❌ Please define the MONGODB_URI environment variable in .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(DB_URL, {
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log("✅ Database connection successful");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ Database connection error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}