import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (mongoUri: string) => {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("MongoDB Connection Error ❌", error);
    process.exit(1);
  }
};

export default connectDB;
