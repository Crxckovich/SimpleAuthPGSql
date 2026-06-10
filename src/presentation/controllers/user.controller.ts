import type { Request, Response } from "express";
import { usersSchema, db } from "@/infrastructure";

class UserController {
  async getUsers(req: Request, res: Response) {
    const users = await db.select().from(usersSchema);
    res.json(users);
  }
}

export default new UserController();
