import 'dotenv/config';
import express from 'express';
import {errorHandler} from "./middleware/globalError.middleware.ts";
import apiRouter from "./routes";
import {authMiddleware} from "./middleware/auth.middleware.ts";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json())
app.use('/api', apiRouter)
app.use(errorHandler);

async function main() {
    try {
        app.listen(PORT, () => console.log(`Сервер запущен на порту http://localhost:${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

main();