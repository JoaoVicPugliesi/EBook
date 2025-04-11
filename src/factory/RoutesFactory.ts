import { db } from "../../db/db";
import { Migrations } from "../../db/migrations/Migrations";
import { Reset } from "../../db/migrations/Reset";
import { Insert } from "../../db/queries/inserts/Insert";
import { Select } from "../../db/queries/selects/Select";
import { Delete } from "../routes/Delete";
import { Get } from "../routes/Get";
import { Post } from "../routes/Post";
import { server } from "../server/Fastify";
import { Routes } from "../routes/Routes";

const migrations = new Migrations(db);
const insert = new Insert(db);
const select = new Select(db);
const reset = new Reset(db);
const get = new Get(server, select);
const post = new Post(server, migrations, insert, select);
const deleted = new Delete(server, reset);
export const routes: Routes = new Routes(get, post, deleted);