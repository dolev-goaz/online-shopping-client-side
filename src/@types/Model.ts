export interface User {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    role: TRole;
    password: string;
}

export type UserReduced = Omit<User, 'password' | 'id'>;

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    imagePath?: string;
}

export interface Purchase {
    amount: number;
    price: number;
    product: Product;
}


export interface Deal {
    id: number;
    commitDate: Date;
    purchases: Purchase[];
}


export type RegisterPayload = Pick<User, 'firstName' | 'lastName' | 'password' | 'email' | 'address'>;

export const Roles = {
    User: 'USER',
    Admin: 'ADMIN',
} as const;

export type TRole = typeof Roles[keyof typeof Roles];