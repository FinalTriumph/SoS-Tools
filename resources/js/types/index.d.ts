export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Player {
    id: number;
    username: string;
    behemoths_bp: number;
    squadron_bp: number;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
