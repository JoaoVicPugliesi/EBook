import { neon } from "@neondatabase/serverless";
import { configDotenv } from "dotenv";

configDotenv();

const { DATABASE_URL } = process.env;

export const db = neon(DATABASE_URL as string);
