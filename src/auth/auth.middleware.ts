import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { config } from "../utils/config.utils";
import { User, UsersDocument } from "../users/user.schema";

export interface IRequest extends Request {
  user?: UsersDocument;
}

export const authGuard = async (
  req: IRequest | any,
  res: Response | any,
  next: NextFunction | any
) => {
  try {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const token = authorization.split(" ")[1];
    const payload = verify(token, config.SECRET) as { id: string };

    if (!payload?.id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(403).json({ message: "Invalid user ID" });
    }

    req.user = user;
    return next(); // ✅ Ensure `next()` is called to continue the request
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed", error });
  }
};
