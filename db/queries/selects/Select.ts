import { Customer } from './../../../src/entities/Customer';
import { NeonQueryFunction } from "@neondatabase/serverless";
import { SelectCustomerByEmailDTO } from "./DTOs/select_customer_by_email";
import { SelectBookByUrlParam } from './DTOs/select_book_by_url_param';

export class Select {
  constructor(private readonly db: NeonQueryFunction<false, false>) {}

  async select_customer_by_email({
    email,
  }: SelectCustomerByEmailDTO): Promise<boolean> {
    const customer: Record<string, Customer>[] = await this.db`
            SELECT * FROM customers
            WHERE customer_email = ${email}
        `;
    
    if(customer.length > 0) return true;

    return false;
  }

  async select_books(): Promise<Record<string, any>[]> {
    return await this.db`
      SELECT * FROM books
      LIMIT(50)
    `
  }

  async select_book_by_url_param({ reference, param }: SelectBookByUrlParam<number>) {
    if(reference === 'book_id') return await this.db`SELECT * FROM books WHERE book_id = ${param}`;
    if(reference === 'subs_id') return await this.db`SELECT * FROM books WHERE subs_id = ${param}`;
    if(reference === 'pub_id') return await this.db`SELECT * FROM books WHERE pub_id = ${param}`;
    if(reference === 'auth_id') return await this.db`SELECT * FROM books WHERE auth_id = ${param}`;
    
    return [];
  }
}
