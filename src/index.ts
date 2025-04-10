import { FastifyInstance } from 'fastify';
import { db } from '../db/db';
import { Migrations} from '../db/migrations/Migrations';
import { Insert } from '../db/queries/inserts/Insert';
import { Select } from '../db/queries/selects/Select';
import { Routes } from './routes/routes';
import { server } from './server/fastify';

const migrations = new Migrations(db);
const insert = new Insert(db);
const select = new Select(db);
const routes: Routes = new Routes(server, migrations, insert, select);

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
