export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    address: string;
    auth: TRole;
    mail: string;
    password: string;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    /**
     * How many copies of this product we have available
     */
    stock: number;
    image: string;
}

export interface Purchase {
    amount: number;
    price: number;
    product: Product;
}


export interface Deal {
    dealId: number;
    commitDate: Date;
    purchases: Purchase[];
}

export interface RegisterPayload {
    firstname: User['firstName'],
    lastname: User['lastName'],
    password: User['password'];
    email: User['mail'];
    address: User['address'];
}

export const Roles = {
    User: 'USER',
    Admin: 'ADMIN',
    NotLogged: 'NONE'
} as const;

export type TRole = typeof Roles[keyof typeof Roles];