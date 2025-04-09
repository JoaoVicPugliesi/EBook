import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Migrations } from "../../db/migrations/Migrations";

export class Routes {
    constructor(
        private readonly server: FastifyInstance,
        private readonly migrations: Migrations
    ) {}

    setupRoutes() {
        this.server.post('/tables/create/customers', async (req: FastifyRequest, res: FastifyReply) => {
            await this.migrations.create_table_subscriptions();
            res.status(201).send({ message: 'Table created' })
        });
    }
}