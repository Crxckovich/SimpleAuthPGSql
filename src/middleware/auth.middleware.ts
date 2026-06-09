import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppStatus } from './globalError.middleware.ts';
import {JWT_SECRET} from "../../auth.config.ts";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return new AppStatus(403, "Пользователь не авторизован");
        }

        if (!authHeader?.startsWith('Bearer ')) {
            return  new AppStatus(403, "Неверный формат токена");
        }

        const token = authHeader.substring(7);

        if (!token) {
            return new AppStatus(403, "Пользователь не авторизован");
        }

        if (!JWT_SECRET) {
            return new AppStatus(500, "JWT_SECRET не настроен");
        }

        const decodedData = jwt.verify(token, JWT_SECRET) as {
            id: number;
            role: number;
        };

        req.user = decodedData;
        next();

    } catch (e) {
        if (e instanceof AppStatus) {
            return res.status(e.statusCode).json({ message: e.message });
        }

        console.error(e);
        return res.status(403).json({ message: "Пользователь не авторизован" });
    }
};