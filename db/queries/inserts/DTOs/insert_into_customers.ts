import { Customer } from "../../../../src/entities/Customer";

export interface InsertIntoCustomersDTO extends Omit<Customer, 'customer_id'> {}