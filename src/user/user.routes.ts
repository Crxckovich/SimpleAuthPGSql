import { Router } from 'express';
import userController from "./user.controller.ts";
import {asyncMiddleware} from "../middleware/async.middleware.ts";

export const userRouter = Router();

userRouter.get('/users', asyncMiddleware(userController.getUsers));

// router.post('/users', userController.createUser);
// router.get('/users/:id', userController.getOneUser);
// router.put('/users/:id', userController.updateUser);
// router.delete('/users/:id', userController.deleteUser);
