import { check, type ValidationChain } from "express-validator";

export const signupValidation: ValidationChain[] = [
  check("name", "Имя пользователя не может быть пустым!").notEmpty(),
  check("password", "Пароль должен быть больше 4-х символов").isLength({ min: 4 }),
];
