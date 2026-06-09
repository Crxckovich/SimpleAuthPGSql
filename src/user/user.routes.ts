import { Router } from 'express';
import userController from "./user.controller.ts";
import {asyncHandler} from "../middleware/asyncHandler.ts";

export const router = Router();

router.get('/users', asyncHandler(userController.getUsers));

// router.post('/users', userController.createUser);
// router.get('/users/:id', userController.getOneUser);
// router.put('/users/:id', userController.updateUser);
// router.delete('/users/:id', userController.deleteUser);
