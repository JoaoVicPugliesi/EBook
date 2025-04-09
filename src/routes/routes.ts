import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Migrations } from "../../db/migrations/Migrations";
import { InsertIntoSubscriptionsDTO } from "../../db/queries/inserts/DTOs/insert_into_subscriptions";
import { Insert } from "../../db/queries/inserts/Insert";

export class Routes {
    constructor(
        private readonly server: FastifyInstance,
        private readonly migrations: Migrations,
        private readonly insert: Insert
    ) {}

    setupRoutes() {
        this.server.post('/ebook/migrate', async (req: FastifyRequest, res: FastifyReply) => {
            await this.migrations.create_table_subscriptions();
            await this.migrations.create_table_customers();
            await this.migrations.create_table_publishers();
            await this.migrations.create_table_authors();
            await this.migrations.create_publishers_authors_pivot_table();
            await this.migrations.create_books_table();
            await this.migrations.create_genres_table();
            await this.migrations.create_books_genres_pivot_table();
            res.status(201).send({ message: 'Table created' })
        });

        this.server.post('/ebook/subscriptions/insert', async (req: FastifyRequest, res: FastifyReply) => {
            const { plan, price } = req.body as InsertIntoSubscriptionsDTO;
            await this.insert.insert_into_subscriptions({
                plan,
                price
            });

            res.status(201).send({ message: 'Subscription Created' })
        });
    }
}