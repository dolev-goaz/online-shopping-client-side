export interface User {
    /**
     * Username
     */
    UserId: string;
    Address: string;
    Auth: TRole;
    Mail: string;
    password: string;
}

export interface Product {
    ProductId: string;
    ProductName: string;
    ProductDesc: string;
    Price: number;
    /**
     * How many copies of this product we have available
     */
    Stock: number;
    Image: string;
}

export interface Purchase {
    DealId: Deal['DealId'];
    ProductId: Product['ProductId'];
    Price: number;
    Amount: number;
}

export interface Deal {
    DealId: string;
    UserId: User['UserId'];
}

export const Roles = {
    User: 'USER',
    Admin: 'ADMIN',
    NotLogged: 'NONE'
} as const;

export type TRole = typeof Roles[keyof typeof Roles];