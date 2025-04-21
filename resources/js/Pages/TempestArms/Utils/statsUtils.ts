import { TempestArmStat, TempestArmStats } from '@/types';
import { CSSProperties } from 'react';

type StatColor = 'red' | 'gold' | 'purple';
type StatGroup = 'troopType' | 'general';

interface TotalStats {
    [key: string]: TempestArmStat;
}

interface FontSizeThreshold {
    minLength: number;
    style: CSSProperties;
}

const fontSizeThresholds: FontSizeThreshold[] = [
    {
        minLength: 28,
        style: {
            fontSize: '85%',
            whiteSpace: 'normal',
            overflowWrap: 'break-word',
            lineHeight: 1,
        },
    },
    {
        minLength: 18,
        style: {
            fontSize: '90%',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
        },
    },
    {
        minLength: 0,
        style: {
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
        },
    },
];

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

export const getStatNameStyle = (statName: string): CSSProperties => {
    for (const threshold of fontSizeThresholds) {
        if (statName.length >= threshold.minLength) {
            return threshold.style;
        }
    }

    return {};
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
            'enemy_behemoth_damage_reduction',
            'aircraft_damage',
            'enemy_aircraft_damage_reduction',
            'lethality_amplification',
            'health_amplification',
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
