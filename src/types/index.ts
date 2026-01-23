export type TPayment = 'card' | 'cash' | '' | null; 

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export type PostAnswer = {
    id: string,
    total: number
}

export type AplResponseList<Type> = {
    total: number,
    items: Type[],
}

export type ValidationErrors = {
    payment?: string;
    address?: string;
    email?: string;
    phone?: string;
}

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string;
    title: string;
    image: string;
    category: string;
    price: number | null;
    description: string
}

export interface IBuyer {
    payment: TPayment;
    address: string;
    email: string;
    phone: string;
}
