import type {Request, Response} from "express";

export class AppError extends Error {
    statusCode: number;
    status: string;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
) => {
    const statusCode = err.statusCode || 500;

    console.error(`[${statusCode}] ${req.method} ${req.url}:`, err.message);

    res.status(statusCode).json({
        status: err.status || 'error',
        message: err.message || 'Внутренняя ошибка сервера',
        ...(process.env.NODE_ENV === 'development' && {
            stack: err.stack
        })
    });
};