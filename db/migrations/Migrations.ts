import { NeonQueryFunction } from "@neondatabase/serverless";

export class Migrations {
    constructor(private readonly db: NeonQueryFunction<false, false>){}

    async create_table_subscriptions() {
        await this.db``
    }

    async create_table_customers() {
        await this.db``
    }

    async create_table_publishers() {
        await this.db``
    }

    async create_table_authors() {
        await this.db``
    }
    
    async create_publishers_authors_pivot_table() {
        await this.db``
    }
    
    async create_books_table() {
        await this.db``
    }
    
    async create_genres_table() {
        await this.db``
    }

    async create_books_genres_pivot_table() {
        await this.db``
    }
}