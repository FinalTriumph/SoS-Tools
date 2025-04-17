import { TempestArmStat, TempestArmStats } from '@/types';

type StatColor = 'red' | 'gold' | 'purple';
type StatGroup = 'troopType' | 'general';

interface TotalStats {
    [key: string]: TempestArmStat;
}

export const initializeTotalStats = (): TotalStats => ({});

export const addStats = (totalStats: TotalStats, tempestArmStats: TempestArmStats): TotalStats => {
    const updatedStats = { ...totalStats };

    tempestArmStats.forEach(stat => {
        const statKey = stat.name?.replace(/ /g, '_').toLowerCase() ?? '';

        if (!updatedStats[statKey]) {
            updatedStats[statKey] = {
                name: stat.name ?? '',
                color: getStatColor(statKey),
                value: 0,
                is_percentage: stat.is_percentage ?? false,
            };
        }

        if (updatedStats[statKey].value === null) {
            updatedStats[statKey].value = 0;
        }

        updatedStats[statKey].value += stat.value ?? 0;
    });

    return updatedStats;
};

export const subtractStats = (totalStats: TotalStats, tempestArmStats: TempestArmStats): TotalStats => {
    const updatedStats = { ...totalStats };

    tempestArmStats.forEach(stat => {
        const statKey = stat.name?.replace(/ /g, '_').toLowerCase() ?? '';

        if (updatedStats[statKey] && updatedStats[statKey].value !== null) {
            updatedStats[statKey].value -= stat.value ?? 0;

            if (updatedStats[statKey].value <= 0) {
                delete updatedStats[statKey];
            }
        }
    });

    return updatedStats;
};

export const formatStatValue = (stat: TempestArmStat): string => {
    return stat.value === null ? '' : stat.is_percentage ? `${stat.value.toFixed(2)}%` : stat.value.toString();
};

export const statColors: Record<StatGroup, Record<StatColor, string[]>> = {
    troopType: {
        red: [
            'infantry_health',
            'infantry_defense',
            'rider_lethality',
            'rider_attack',
            'hunter_lethality',
            'hunter_attack',
        ],
        gold: [
            'infantry_lethality',
            'rider_health',
            'hunter_health',
        ],
        purple: [
            'infantry_attack',
            'rider_defense',
            'hunter_defense',
        ],
    },
    general: {
        red: [
            'final_damage_bonus',
            'final_damage_taken_reduction',
            'hero_final_damage',
            'hero_final_damage_taken_reduction',
        ],
        gold: [
            'behemoth_damage',
            'behemoth_damage_reduction',
        ],
        purple: [],
    },
};

export const getStatColor = (statKey: string): StatColor => {
    for (const group of ['troopType', 'general'] as StatGroup[]) {
        for (const color of ['red', 'gold', 'purple'] as StatColor[]) {
            if (statColors[group][color]?.includes(statKey)) {
                return color;
            }
        }
    }
    return 'purple';
};

export const sortStats = (stats: TotalStats): TotalStats => {
    const orderedStats: TotalStats = {};
    const statsCopy = { ...stats };

    const colorPriority: StatColor[] = ['red', 'gold', 'purple'];

    for (const group of ['troopType', 'general'] as StatGroup[]) {
        for (const color of colorPriority) {
            const statKeys = statColors[group][color] ?? [];
            statKeys.forEach(statKey => {
                if (statsCopy[statKey]) {
                    orderedStats[statKey] = statsCopy[statKey];
                    delete statsCopy[statKey];
                }
            });
        }
    }

    Object.assign(orderedStats, statsCopy);

    return orderedStats;
};
