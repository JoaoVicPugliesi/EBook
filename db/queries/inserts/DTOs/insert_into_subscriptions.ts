type Plan = 'Free' | 'Standard' | 'Plus';

export interface InsertIntoSubscriptionsDTO {
    plan: Plan,
    price: number
}