import { AppStatus } from "@/presentation/middleware/globalError.middleware.ts";
import type { Response } from "express";

export const handleAuthError = (e: unknown, res: Response) => {
  if (e instanceof AppStatus) {
    return res.status(e.statusCode).json({ message: e.message });
  }

  console.error(e);
  return res.status(403).json({ message: "Пользователь не авторизован" });
};
