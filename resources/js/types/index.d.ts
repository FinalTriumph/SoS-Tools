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
    mk1: Mk1 | null;
    mk2: Mk2 | null;
    formation_system: FormationSystem | null;
    army: Army | null;
}

export interface Mk1 {
    id: number;
    player_id: number;
    level: number | null;
    stars: number | null;
    color: string | null;
    skills: number | null;
    skill_1: number | null;
    skill_2: number | null;
    skill_3: number | null;
    skill_4: number | null;
    skill_5: number | null;
}

export interface Mk2 {
    id: number;
    player_id: number;
    level: number | null;
    stars: number | null;
    color: string | null;
    skills: number | null;
    skill_1: number | null;
    skill_2: number | null;
    skill_3: number | null;
    skill_4: number | null;
    skill_5: number | null;
}

export interface FormationSystem {
    id: number;
    player_id: number;
    level: number | null;
    skill_1: number | null;
    skill_2: number | null;
    skill_3: number | null;
    skill_4: number | null;
    skill_5: number | null;
}

export interface Army {
    id: number;
    player_id: number;
    plasma: number | null;
    tier: number | null;
    t12_infantry: number | null;
    t12_rider: number | null;
    t12_hunter: number | null;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
