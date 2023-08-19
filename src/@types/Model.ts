export interface User {
    UserId: string;
    FirstName: string;
    LastName: string;
    Address: string;
    Auth: TRole;
    Mail: string;
    password: string;
}

export interface Product {
    Id: number;
    Title: string;
    Description: string;
    Price: number;
    /**
     * How many copies of this product we have available
     */
    Stock: number;
    Image: string;
}

export interface Purchase {
    amount: number;
    price: number;
    product: Product;
}


export interface Deal {
    dealId: number;
    purchases: Purchase[];
}

export interface RegisterPayload {
    firstname: User['FirstName'],
    lastname: User['LastName'],
    password: User['password'];
    email: User['Mail'];
    address: User['Address'];
}

export const Roles = {
    User: 'USER',
    Admin: 'ADMIN',
    NotLogged: 'NONE'
} as const;

export type TRole = typeof Roles[keyof typeof Roles];