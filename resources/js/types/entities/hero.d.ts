import { TempestArm } from './tempestArm';

export interface HeroGeneral {
    player_id: number | null;
    name: string | null;
    generation: number | null;
    troop_type: string | null;
    type: string | null;
    attack_defense_stats: number | null;
}

export interface HeroTempestArmsIds {
    attack_tempest_arm_id: number | null;
    defense_tempest_arm_id: number | null;
}

export interface HeroTempestArms {
    attack_tempest_arm: TempestArm | null;
    defense_tempest_arm: TempestArm | null;
}

export interface Hero extends HeroGeneral, HeroTempestArmsIds, HeroTempestArms {
    id: number;
}
