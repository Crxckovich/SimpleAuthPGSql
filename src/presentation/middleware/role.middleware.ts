import type { Request, Response, NextFunction } from "express";
import { AppStatus } from "./globalError.middleware.ts";
import { verifyToken } from "../utils/auth/jwt.utils.ts";
import { handleAuthError } from "../utils/auth/authError.utils.ts";

export const roleMiddleware =
  (roles: number[]) => (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") {
      return next();
    }

    try {
      const userRole = verifyToken(req);

      let hasRole = false;

      if (roles.includes(userRole.role)) {
        hasRole = true;
      }

      if (!hasRole) {
        throw new AppStatus(403, "У вас нет доступа");
      }

      next();
    } catch (e) {
      handleAuthError(e, res);
    }
  };
