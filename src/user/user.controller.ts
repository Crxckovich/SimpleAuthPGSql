import type {Request, Response,} from 'express';
import {db} from "../database/database.provider.ts";
import {usersTable} from "./user.schema.ts";

interface ICreateUserDto {
    name: string;
    surname: string;
}

class UserController {
    // async createUser(req: Request<{}, {}, ICreateUserDto>, res: Response) {
    //     const { name, surname } = req.body;
    //
    //     const newPerson = await database.query(
    //         `INSERT INTO person (name, surname)
    //         values ($1, $2) RETURNING *`, [name, surname]);
    //
    //     res.json(newPerson.rows[0]);
    // }

    async getUsers(req: Request, res: Response) {
        const users = await db.select().from(usersTable);
        res.json(users);
    }

    // async getOneUser(req: Request, res: Response) {
    //     const id = req.params.id;
    //
    //     const user = await database.query(`SELECT * FROM person WHERE id = $1`, [id]);
    //     res.json(user.rows[0]);
    // }
    //
    // async updateUser(req: Request, res: Response) {
    //     const {id, name, surname} = req.body;
    //     const user = await database.query('UPDATE person set name = $1, surname = $2, WHERE id = $3 RETURNING *', [name, surname, id]);
    // }
    //
    // async deleteUser(req: Request, res: Response) {
    //
    // }
}

export default new UserController();