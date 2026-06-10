import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.ts";
import { roleMiddleware } from "../middleware/role.middleware.ts";
import { userRouter } from "./user.routes.ts";
import { authRouter } from "./auth.routes.ts";
import { ERole } from "@/domain";

export const apiRouter = Router();

apiRouter.use(authRouter);
apiRouter.use(authMiddleware, roleMiddleware([ERole.USER, ERole.ADMIN]), userRouter);

export default apiRouter;
