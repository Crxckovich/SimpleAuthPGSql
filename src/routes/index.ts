import { Router } from 'express';
import {authRouter} from "../auth/auth.routes.ts";
import {userRouter} from "../user/user.routes.ts";
import {authMiddleware} from "../middleware/auth.middleware.ts";
import {roleMiddleware} from "../middleware/role.middleware.ts";

export const apiRouter = Router();

apiRouter.use(authRouter);
apiRouter.use(authMiddleware, roleMiddleware(["USER", "ADMIN"]), userRouter);

export default apiRouter;