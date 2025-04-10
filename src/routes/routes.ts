import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Migrations } from "../../db/migrations/Migrations";
import { InsertIntoSubscriptionsDTO } from "../../db/queries/inserts/DTOs/insert_into_subscriptions";
import { Insert } from "../../db/queries/inserts/Insert";
import { InsertIntoCustomersDTO } from "../../db/queries/inserts/DTOs/insert_into_customers";
import { Select } from "../../db/queries/selects/Select";

export class Routes {
    constructor(
        private readonly server: FastifyInstance,
        private readonly migrations: Migrations,
        private readonly insert: Insert,
        private readonly select: Select
    ) {}

    setupRoutes() {
        // Migrations
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

        // Insertions 
        this.server.post('/ebook/subscriptions/insert', async (req: FastifyRequest, res: FastifyReply) => {
            const { plan, price } = req.body as InsertIntoSubscriptionsDTO;
            await this.insert.insert_into_subscriptions({
                plan,
                price
            });

            res.status(201).send({ message: 'Subscription Created' })
        });

        this.server.post('/ebook/customers/insert', async (req: FastifyRequest, res: FastifyReply) => {
            const { customer_email, customer_name, subs_id } = req.body as InsertIntoCustomersDTO;
            const customer: boolean = await this.select.select_customer_by_email({ email: customer_email });
            if(customer) return res.status(409).send({ message: 'Conflict... Customer Already Exists' });
            await this.insert.insert_into_customers({
                customer_email,
                customer_name,
                subs_id
            });

            return res.status(201).send({ message: 'Customer Created' });
        });

    }
}