import mongoose from "mongoose";

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mydb";

let cached = globalThis.__mongooseCache;

if (!cached) {
  cached = globalThis.__mongooseCache = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI);
  }

  cached.conn = await cached.promise;

  return cached.conn;
}
