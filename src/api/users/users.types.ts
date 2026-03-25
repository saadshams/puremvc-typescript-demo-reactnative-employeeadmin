export type User = {
    user_id?: number;
    id: number;
    username: string;
    first: string;
    last: string;
    email: string;
    password: string;
    department: {
        id: number;
        name: string;
    };
    roles: {
        id: number;
        name: string;
    }[]
};