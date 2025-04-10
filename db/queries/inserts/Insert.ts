import { NeonQueryFunction } from "@neondatabase/serverless";
import { InsertIntoSubscriptionsDTO } from "./DTOs/insert/insert_into_subscriptions";
import { InsertIntoCustomersDTO } from "./DTOs/insert/insert_into_customers";
import { InsertIntoPublishersDTO } from "./DTOs/insert/insert_into_publishers";
import { InsertIntoAuthorsDTO } from "./DTOs/insert/insert_into_authors";
import { InsertIntoPublishersAuthorsDTO } from "./DTOs/insert/insert_into_publishers_authors";
import { InsertIntoBooksDTO } from "./DTOs/insert/insert_into_books";
import { InsertIntoGenresDTO } from "./DTOs/insert/insert_into_genres";
import { InsertIntoBooksGenresDTO } from "./DTOs/insert/insert_into_books_genres";

export class Insert {
    constructor(private readonly db: NeonQueryFunction<false, false>) {}

    async insert_into_subscriptions({ plan, price }: InsertIntoSubscriptionsDTO) {
        await this.db`
            INSERT INTO subscriptions (plan, price) 
            VALUES (${plan}, ${price})
        `;
    }

    async insert_into_customers({ customer_email, customer_name, subs_id }: InsertIntoCustomersDTO) {
        await this.db`
            INSERT INTO customers (customer_email, customer_name, subs_id) 
            VALUES (${customer_email}, ${customer_name}, ${subs_id})
        `;
    }

    async insert_into_publishers({ pub_name, pub_desc }: InsertIntoPublishersDTO) {
        await this.db`
            INSERT INTO publishers (pub_name, pub_desc) 
            VALUES (${pub_name}, ${pub_desc})
        `;
    }

    async insert_into_authors({ auth_name, auth_desc }: InsertIntoAuthorsDTO) {
        await this.db`
            INSERT INTO authors (auth_name, auth_desc) 
            VALUES (${auth_name}, ${auth_desc})
        `;
    }

    async insert_into_publishers_authors({ pub_id, auth_id }: InsertIntoPublishersAuthorsDTO) {
        await this.db`
            INSERT INTO publishers_authors (pub_id, auth_id) 
            VALUES (${pub_id}, ${auth_id})
        `;
    }

    async insert_into_books({ book_name, book_desc, subs_id, pub_id, auth_id }: InsertIntoBooksDTO) {
        await this.db`
            INSERT INTO books (book_name, book_desc, subs_id, pub_id, auth_id) 
            VALUES (${book_name}, ${book_desc}, ${subs_id}, ${pub_id}, ${auth_id})
        `;
    }
    
    async insert_into_genres({ gen_name, gen_desc } : InsertIntoGenresDTO) {
        await this.db`
            INSERT INTO genres (gen_name, gen_desc) 
            VALUES (${gen_name}, ${gen_desc})
        `;
    }

    async insert_into_books_genres({ book_id, gen_id } : InsertIntoBooksGenresDTO) {
        await this.db`
            INSERT INTO genres (book_id, gen_id) 
            VALUES (${book_id}, ${gen_id})
        `;
    }
    
}