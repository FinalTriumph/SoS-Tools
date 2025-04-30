export interface Army {
    id: number;
    player_id: number;
    plasma: number | null;
    tier: number | null;
    t12_infantry: number | null;
    t12_rider: number | null;
    t12_hunter: number | null;
    updated_at: string | null;
}
