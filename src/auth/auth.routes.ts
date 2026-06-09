import { Router } from 'express';
import authController from "./auth.controller.ts";
import {asyncHandler} from "../middleware/asyncHandler.ts";

export const router = Router();

router.post("/signup", asyncHandler(authController.signup));
router.post("/signin", asyncHandler(authController.signin))