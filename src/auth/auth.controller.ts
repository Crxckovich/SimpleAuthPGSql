import type {Request, Response} from "express";
import {db} from "../database/database.provider.ts";
import {usersSchema} from "../user/user.schema.ts";
import {eq} from "drizzle-orm";
import {AppStatus} from "../middleware/globalError.middleware.ts";
import {rolesSchema} from "../role/role.schema.ts";
import {validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../../auth.config.ts";

interface IAuthDto {
    name: string;
    password: string;
}

class AuthController {
    signup = async (req: Request<{}, {}, IAuthDto>, res: Response) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Ошибка регистрации", errors});
        }

        const {name, password} = req.body;

        const candidate = await db.query.usersSchema.findFirst({
            where: eq(usersSchema.name, name)
        })

        if (candidate) {
            throw new AppStatus(409, `Пользователь ${name} уже существует`);
        }

        const hashPassword = await Bun.password.hash(password);
        const userRole = await db.query.rolesSchema.findFirst({
            where: eq(rolesSchema.value, "USER")
        });

        if (!userRole) {
            throw new AppStatus(500, "Роль USER не найдена. Проверьте начальные данные.");
        }

        const newUser = await db.insert(usersSchema).values({
            name: name,
            password: hashPassword,
            role_id: userRole.id,
        }).returning();


        return res.status(201).json({message: "Пользователь успешно зарегистрирован"})
    }

    signin = async(req: Request<{}, {}, IAuthDto>, res: Response) =>  {
        const {name, password} = req.body;

        const candidate = await db.query.usersSchema.findFirst({
            where: eq(usersSchema.name, name)
        })

        if (!candidate) {
            throw new AppStatus(409, `Пользователь ${name} не найден`);
        }

        const validPassword = await Bun.password.verify(password, candidate.password)
        if (!validPassword) {
            throw new AppStatus(400, `Введен не верный пароль.`);
        }

        const token = this.generateAccessToken(candidate.id, candidate.role_id);
        return res.json({token});
    }

    generateAccessToken = (id: number, role: number) => {
        const payload = {
            id,
            role
        }

        if (!JWT_SECRET) {
            throw new AppStatus(500, "Не задан")
        }

        return jwt.sign(payload, JWT_SECRET, {expiresIn: "24h"});

    }

}

export default new AuthController();