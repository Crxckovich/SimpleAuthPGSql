import { validationResult } from "express-validator";
import { AppStatus } from "./globalError.middleware.ts";
import type { NextFunction, Request, Response } from "express";

export const validateMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new AppStatus(400, `Ошибка валидации: ${errors}`);
  }

  next();
};
