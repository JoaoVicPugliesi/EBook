import { FastifyInstance } from 'fastify';
import { db } from '../db/db';
import { Migrations} from '../db/migrations/Migrations';
import { Insert } from '../db/queries/inserts/Insert';
import { Select } from '../db/queries/selects/Select';
import { Routes } from './routes/Routes';
import { server } from './server/Fastify';
import { Get } from './routes/Get';
import { Post } from './routes/Post';
import { Delete } from './routes/Delete';
import { Reset } from '../db/migrations/Reset';


const migrations = new Migrations(db);
const insert = new Insert(db);
const select = new Select(db);
const reset = new Reset(db);
const get = new Get(server, select);
const post = new Post(server, migrations, insert, select);
const deleted = new Delete(server, reset);
const routes: Routes = new Routes(get, post, deleted);

class Application {
  constructor(private readonly server: FastifyInstance) {}

  async run() {
    try {
      await this.server.listen({
        port: 8000,
        host: '0.0.0.0',
      });
      console.log(`🚀 server is running on http://localhost:8000`);
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }
}

const application = new Application(server);
application.run();
routes.setupRoutes();
