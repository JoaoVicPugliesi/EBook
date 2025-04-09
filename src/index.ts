import { FastifyInstance } from "fastify";
import { server } from "./fastify";

class Application {
  constructor(private readonly server: FastifyInstance) {}

  async run() {
    try {
      await this.server.listen({
        port: 8000,
        host: "0.0.0.0",
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

