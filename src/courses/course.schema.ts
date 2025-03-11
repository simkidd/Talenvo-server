import mongoose, { Document, model, Schema, Types } from "mongoose";
import { UsersDocument } from "../users/user.schema";

export type CourseDocument = Document & ICourse;

interface ICourse {
  _id: string;
  image: string;
  title: String;
  description: String;
  subject: string;
  course: string;
  resourceUrl: String; // Link to video/PDF
  uploadedBy: UsersDocument;
}

export const CourseSechema: Schema<ICourse> = new Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  subject: { type: String, require: true },
  description: { type: String, required: true },
  course: { type: String, required: true },
  resourceUrl: { type: String, required: true },
  uploadedBy: { type: Types.ObjectId, ref: "User", autopopulate: true },
});

export const Course = model<ICourse>("Course", CourseSechema);
