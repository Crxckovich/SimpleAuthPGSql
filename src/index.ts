import 'dotenv/config';
import express from 'express';
import {router} from "./user/user.routes.ts";
import {errorHandler} from "./middleware/globalErrorHandler.ts";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json())
app.use('/api', router)
app.use(errorHandler);


async function main() {
    try {
        app.listen(PORT, () => console.log(`Сервер запущен на порту http://localhost:${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

main();
