import { Response } from "express";

export const handleError = (e: unknown, res: Response, statusCode = 500) => {
  if (!e) return;
  const error = e as Error;
  const message = error?.message;
  res.status(statusCode).json(message);
};
