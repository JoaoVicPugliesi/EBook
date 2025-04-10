import { NeonQueryFunction } from "@neondatabase/serverless";
import { InsertIntoSubscriptionsDTO } from "./DTOs/insert_into_subscriptions";
import { InsertIntoCustomersDTO } from "./DTOs/insert_into_customers";

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
}