type Reference =  'book_id' | 'subs_id' | 'pub_id' | 'auth_id';

export interface SelectBookByUrlParam<T> {
    reference: Reference
    param: T,
}