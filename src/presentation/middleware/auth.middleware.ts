import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/auth/jwt.utils";
import { handleAuthError } from "../utils/auth/authError.utils";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    req.user = verifyToken(req);
    next();
  } catch (e) {
    handleAuthError(e, res);
  }
};
