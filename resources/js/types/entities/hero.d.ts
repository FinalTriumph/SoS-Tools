export interface HeroGeneral {
    player_id: number | null;
    name: string | null;
    generation: number | null;
    troop_type: string | null;
    type: string | null;
    attack_defense_stats: number | null;
}

export interface HeroTempestArms {
    attack_tempest_arm_id: number | null;
    defense_tempest_arm_id: number | null;
}

export interface Hero extends HeroGeneral, HeroTempestArms {
    id: number;
}
