import type {Request, Response,} from 'express';
import {db} from "../database/database.provider.ts";
import {usersSchema} from "./user.schema.ts";


class UserController {

    async getUsers(req: Request, res: Response) {
        const users = await db.select().from(usersSchema);
        res.json(users);
    }

}

export default new UserController();