import { Document, model, Schema, Types } from "mongoose";
import { UsersDocument } from "../users/user.schema";
export type AuthDocument = Document & IAuth;

interface IAuth {
  _id: string;
  email: string;
  password: string;
  profile: UsersDocument;
  emailToken: string;
}
const AuthSchema = new Schema<IAuth>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  emailToken: { type: String },
  profile: { type: Types.ObjectId, ref: "User" },
});

export const Auth = model<IAuth>("Auth", AuthSchema);
