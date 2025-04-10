import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Insert } from "../../db/queries/inserts/Insert";
import { InsertIntoSubscriptionsDTO } from "../../db/queries/inserts/DTOs/insert/insert_into_subscriptions";
import { InsertIntoCustomersDTO } from "../../db/queries/inserts/DTOs/insert/insert_into_customers";
import { Migrations } from "../../db/migrations/Migrations";
import { InsertIntoPublishersDTO } from "../../db/queries/inserts/DTOs/insert/insert_into_publishers";
import { InsertIntoAuthorsDTO } from "../../db/queries/inserts/DTOs/insert/insert_into_authors";
import { InsertIntoPublishersAuthorsDTO } from "../../db/queries/inserts/DTOs/insert/insert_into_publishers_authors";
import { InsertIntoBooksDTO } from "../../db/queries/inserts/DTOs/insert/insert_into_books";
import { InsertIntoGenresDTO } from "../../db/queries/inserts/DTOs/insert/insert_into_genres";
import { InsertIntoBooksGenresDTO } from "../../db/queries/inserts/DTOs/insert/insert_into_books_genres";
import { Select } from "../../db/queries/selects/Select";

export class Post {
    constructor(
        private readonly server: FastifyInstance,
        private readonly migrations: Migrations,
        private readonly insert: Insert,
        private readonly select: Select,
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

        this.server.post('/ebook/publishers/insert', async(req: FastifyRequest, res: FastifyReply) => {
            const { pub_name, pub_desc } = req.body as InsertIntoPublishersDTO;
            await this.insert.insert_into_publishers({ 
                pub_name,
                pub_desc
            });
            
            return res.status(201).send({ message: 'Publisher Created' })
        });

        this.server.post('/ebook/authors/insert', async(req: FastifyRequest, res: FastifyReply) => {
            const { auth_name, auth_desc } = req.body as InsertIntoAuthorsDTO;
            await this.insert.insert_into_authors({ 
                auth_name,
                auth_desc
            });
            
            return res.status(201).send({ message: 'Author Created' })
        });

        this.server.post('/ebook/publishers_authors/insert', async(req: FastifyRequest, res: FastifyReply) => {
            const { pub_id, auth_id } = req.body as InsertIntoPublishersAuthorsDTO;
            await this.insert.insert_into_publishers_authors({ 
                pub_id,
                auth_id
            });
        
            return res.status(201).send({ message: 'Publishers_Authors Pivot Table Resource Created' })
        });

        this.server.post('/ebook/books/insert', async(req: FastifyRequest, res: FastifyReply) => {
            const { book_name, book_desc,subs_id, pub_id, auth_id } = req.body as InsertIntoBooksDTO;
            await this.insert.insert_into_books({ 
                book_name,
                book_desc,
                subs_id, 
                pub_id, 
                auth_id
            });
            
            return res.status(201).send({ message: 'Book Created' })
        });

        this.server.post('/ebook/genres/insert', async(req: FastifyRequest, res: FastifyReply) => {
            const { gen_name, gen_desc } = req.body as InsertIntoGenresDTO;
            await this.insert.insert_into_genres({ 
                gen_name,
                gen_desc
            });
        
            return res.status(201).send({ message: 'Genre Created' })
        });

        this.server.post('/ebook/books_genres/insert', async(req: FastifyRequest, res: FastifyReply) => {
            const { book_id, gen_id } = req.body as InsertIntoBooksGenresDTO;
            await this.insert.insert_into_books_genres({ 
                book_id,
                gen_id
            });
        
            return res.status(201).send({ message: 'Books_Genres Pivot Table Resource Created' })
        });
    }
}