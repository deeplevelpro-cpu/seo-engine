import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectDB() {
  if (mongoose.connection.readyState === 1) return;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI missing");
  }

  await mongoose.connect(MONGODB_URI, {
    dbName: "blog",
  });
}
