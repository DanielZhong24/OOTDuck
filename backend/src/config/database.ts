import pgPromise from "pg-promise";
import dotenv from "dotenv";

dotenv.config();

const pgp = pgPromise();
const connection: string = process.env.DB_CONNECTION || "";
const db = pgp(connection);

export default db;
