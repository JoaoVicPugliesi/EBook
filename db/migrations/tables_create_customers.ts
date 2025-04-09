export function tables_create_customers(): string {
  const query: string = `
            CREATE TABLE customers (
                customer_id INTEGER PRIMARY KEY,
                customer_email VARCHAR UNIQUE,
                customer_name VARCHAR
            )`;

  return query;
}
