export interface TempestArmGeneral {
    player_id: number | null;
    troop_type: string | null;
    type: string | null;
    generation: string | null;
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

export interface TempestArm extends TempestArmGeneral {
    id: number;
    stats: TempestArmStats;
    skill: TempestArmSkill;
}
