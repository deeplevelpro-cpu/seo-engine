	import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export async function connectDB() {
  if (mongoose.connection.readyState === 1) return;

  if (!MONGO_URI) throw new Error("MONGO_URI missing");

  await mongoose.connect(MONGO_URI);
}

