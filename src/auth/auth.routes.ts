import { Router } from 'express';
import authController from "./auth.controller.ts";
import {asyncMiddleware} from "../middleware/async.middleware.ts";
import { check } from "express-validator";
import {authMiddleware} from "../middleware/auth.middleware.ts";

export const authRouter = Router();

authRouter.post("/signup",
    check("name", "Имя пользователя не может быть пустым!").notEmpty(),
    check("password", "Пароль должен быть больше 4-х символов").isLength({ min: 4 }),
    asyncMiddleware(authController.signup));
authRouter.post("/signin", asyncMiddleware(authController.signin))