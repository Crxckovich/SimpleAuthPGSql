import jwt from "jsonwebtoken";
import type { Request } from "express";
import { JWT_SECRET } from "@/config";
import { AppStatus } from "@/presentation/middleware/globalError.middleware.ts";

export const verifyToken = (req: Request) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new AppStatus(403, "Неверный формат токена");
  }

  const token = authHeader.substring(7);
  if (!token) {
    throw new AppStatus(403, "Пользователь не авторизован");
  }

  if (!JWT_SECRET) {
    throw new AppStatus(500, "JWT_SECRET не настроен");
  }

  return jwt.verify(token, JWT_SECRET) as { id: number; role: number };
};
