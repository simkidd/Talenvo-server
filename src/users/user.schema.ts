import { Document, model, Schema, Types } from "mongoose";
import { CourseDocument } from "../courses/course.schema";

export type UsersDocument = Document & IUser;

interface IUser {
  _id: string;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  gender: string;
  role: string;
  courses: CourseDocument;
}

export const UserSchema: Schema<IUser> = new Schema({
  image: { type: String, required: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  gender: { type: String, required: true },
  courses: [{ type: Types.ObjectId, ref: "Course", autopopulate: true }],
  role: {
    type: String,
    enum: ["teacher", "user"],
    default: "teacher",
  },
});

export const User = model<IUser>("User", UserSchema);
