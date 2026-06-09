import type {Request, Response} from "express";
import {db} from "../database/database.provider.ts";
import {usersTable} from "../user/user.schema.ts";

class AuthController {

    async signup(req: Request, res: Response) {}

    async signin(req: Request, res: Response)  {}
}

export default new AuthController();