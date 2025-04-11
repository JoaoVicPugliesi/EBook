import { NeonQueryFunction } from "@neondatabase/serverless";

export class Reset {
  constructor(private readonly db: NeonQueryFunction<false, false>) {}

  async drop_table_subscriptions() {
    await this.db`
        DROP TABLE subscriptions CASCADE
    `
  }

  async drop_table_customers() {
    await this.db`
        DROP TABLE customers CASCADE
    `;
  }

  async drop_table_publishers() {
    await this.db`
        DROP TABLE publishers CASCADE
    `; 
  }

  async drop_table_authors() {
    await this.db`
        DROP TABLE authors CASCADE
    `;
  }

  async drop_publishers_authors_pivot_table() {
    await this.db`
        DROP TABLE publishers_authors CASCADE
    `;
  }

  async drop_books_table() {
    await this.db`
        DROP TABLE books CASCADE
    `;
  }

  async drop_genres_table() {
    await this.db`
        DROP TABLE genres CASCADE
    `;
  }

  async drop_books_genres_pivot_table() {
    await this.db`
        DROP TABLE books_genres CASCADE
    `;
  }
}
