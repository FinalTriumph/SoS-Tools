export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Player {
    id: number;
    user_id: number;
    username: string;
    alliance: string | null;
    behemoths_bp: number | null;
    squadron_bp: number | null;
    fa1_stars: number | null;
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

export interface TempestArmStat {
    name: string | null;
    value: number | null;
    is_percentage: boolean | null;
    color: string | null;
}

export type TempestArmStats = [
    TempestArmStat,
    TempestArmStat,
    TempestArmStat,
    TempestArmStat
];

export interface TempestArmSkill {
    name: string | null;
    level: number | null;
    quality: string | null;
}

export interface TempestArm {
    id: number;
    player_id: number | null;
    troop_type: string | null;
    type: string | null;
    generation: string | null;
    stats: TempestArmStats;
    skill: TempestArmSkill;
}

export type TempestArmGeneral = Omit<TempestArm, 'id' | 'stats' | 'skill'>;

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    features: {
        tempestArms: boolean;
    };
};
