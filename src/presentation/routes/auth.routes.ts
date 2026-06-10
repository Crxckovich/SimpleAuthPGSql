import { Router } from "express";
import authController from "../controllers/auth.controller.ts";
import { signupValidation } from "../validators/auth.validation.ts";
import { asyncMiddleware } from "../middleware/async.middleware.ts";

export const authRouter = Router();

authRouter.post("/signup", signupValidation, asyncMiddleware(authController.signup));
authRouter.post("/signin", signupValidation, asyncMiddleware(authController.signin));
