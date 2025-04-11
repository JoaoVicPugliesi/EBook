import { NeonQueryFunction } from "@neondatabase/serverless";

export class Migrations {
  constructor(private readonly db: NeonQueryFunction<false, false>) {}

  async create_table_subscriptions() {
    await this.db`
        CREATE TABLE subscriptions (
            subs_id SERIAL PRIMARY KEY,
            plan VARCHAR UNIQUE,
            price FLOAT
        )`;
  }

  async create_table_customers() {
    await this.db`
        CREATE TABLE customers (
            customer_id SERIAL PRIMARY KEY,
            customer_email VARCHAR UNIQUE,
            customer_name VARCHAR,
            subs_id INTEGER,

            FOREIGN KEY (subs_id) REFERENCES subscriptions(subs_id) ON DELETE CASCADE
        )`;
  }

  async create_table_publishers() {
    await this.db`
        CREATE TABLE publishers (
            pub_id SERIAL PRIMARY KEY,
            pub_name VARCHAR UNIQUE,
            pub_desc VARCHAR
        )`;
  }

  async create_table_authors() {
    await this.db`
        CREATE TABLE authors (
            auth_id SERIAL PRIMARY KEY,
            auth_name VARCHAR,
            auth_desc VARCHAR
        )`;
  }

  async create_publishers_authors_pivot_table() {
    await this.db`
        CREATE TABLE publishers_authors (
            pub_id INTEGER, 
            auth_id INTEGER,
                
            PRIMARY KEY (pub_id, auth_id),
            FOREIGN KEY (pub_id) REFERENCES publishers(pub_id) ON DELETE CASCADE,
            FOREIGN KEY (auth_id) REFERENCES authors(auth_id) ON DELETE CASCADE
        )`;
  }

  async create_books_table() {
    await this.db`
        CREATE TABLE books (
            book_id SERIAL PRIMARY KEY,
            book_name VARCHAR,
            book_desc VARCHAR,
            subs_id INTEGER,
            pub_id INTEGER,
            auth_id INTEGER,

            FOREIGN KEY  (subs_id) REFERENCES subscriptions(subs_id) ON DELETE CASCADE,
            FOREIGN KEY  (pub_id) REFERENCES publishers(pub_id) ON DELETE CASCADE,
            FOREIGN KEY  (auth_id) REFERENCES authors(auth_id) ON DELETE CASCADE
        )`;
  }

  async create_genres_table() {
    await this.db`
        CREATE TABLE genres (
            gen_id SERIAL PRIMARY KEY,
            gen_name VARCHAR UNIQUE,
            gen_desc VARCHAR
        )`;
  }

  async create_books_genres_pivot_table() {
    await this.db`
        CREATE TABLE books_genres (
            book_id INTEGER,
            gen_id INTEGER,

            PRIMARY KEY (book_id, gen_id),
            FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE,
            FOREIGN KEY (gen_id) REFERENCES genres(gen_id) ON DELETE CASCADE
        )`;
  }
}
