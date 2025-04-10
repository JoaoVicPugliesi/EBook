import { NeonQueryFunction } from "@neondatabase/serverless";
import { InsertIntoSubscriptionsDTO } from "./DTOs/insert_into_subscriptions";
import { InsertIntoCustomersDTO } from "./DTOs/insert_into_customers";
import { InsertIntoPublishersDTO } from "./DTOs/insert_into_publishers";

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
}