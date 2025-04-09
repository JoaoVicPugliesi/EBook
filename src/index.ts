import { FastifyInstance } from 'fastify';
import { server } from './server/fastify';
import { Routes } from './routes/routes';
import { db } from '../db/db';
import { Migrations} from '../db/migrations/Migrations';
import { Insert } from '../db/queries/inserts/Insert';

const migrations = new Migrations(db);
const insert = new Insert(db);
const routes: Routes = new Routes(server, migrations, insert);

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
