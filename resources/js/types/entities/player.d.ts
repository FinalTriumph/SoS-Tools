import { Mk } from './mk';
import { FormationSystem } from './formationSystem';
import { Army } from './army';

export interface Player {
    id: number;
    user_id: number;
    username: string;
    alliance: string | null;
    behemoths_bp: number | null;
    squadron_bp: number | null;
    fa1_stars: number | null;
    updated_at: string | null;
    mk1: Mk | null;
    mk2: Mk | null;
    formation_system: FormationSystem | null;
    army: Army | null;
}
