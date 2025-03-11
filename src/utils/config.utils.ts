import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  SECRET: process.env.SECRET || "jdkjdjkdk",
  MONGO_URI: process.env.MONGO_URI || "",
  // MONGO_URI: "mongodb://localhost/jh",
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
};
