import "dotenv/config";
import express from "express";
import { apiRouter, errorMiddleware, validateMiddleware } from "@/presentation";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use("/api", apiRouter);
app.use(validateMiddleware);
app.use(errorMiddleware);

async function main() {
  try {
    app.listen(PORT, () => console.log(`Сервер запущен на порту http://localhost:${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

main();
