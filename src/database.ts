import { Pool } from "pg";

export const database = new Pool({
    user: "postgres",
    password: "artpe",
    host: "localhost",
    port: 5432,
    database: "first_postgres"
})