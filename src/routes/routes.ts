import { NeonQueryFunction } from "@neondatabase/serverless";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export class Routes {
    constructor(
        private readonly server: FastifyInstance,
        private readonly db: NeonQueryFunction<false, false> 
    ) {}

    setupRoutes() {
        this.server.post('/tables/create/customers', async (req: FastifyRequest, res: FastifyReply) => {
            await this.db`
            CREATE TABLE customers (
                customer_id INTEGER PRIMARY KEY,
                customer_email VARCHAR UNIQUE,
                customer_name VARCHAR
            )`

            res.status(201).send({ message: 'Table created' })
        });
    }
}