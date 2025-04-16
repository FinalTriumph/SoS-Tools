import { TempestArmStat, TempestArmStats } from '@/types';

interface TotalStats {
    [key: string]: TempestArmStat;
}

export const initializeTotalStats = (): TotalStats => ({});

export const addStats = (totalStats: TotalStats, tempestArmStats: TempestArmStats): TotalStats => {
    const updatedStats = { ...totalStats };

    tempestArmStats.forEach(stat => {
        const statKey = stat.name?.replace(' ', '_') ?? '';

        if (!updatedStats[statKey]) {
            updatedStats[statKey] = {
                name: stat.name ?? '',
                color: stat.color ?? '',
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
        const statKey = stat.name?.replace(' ', '_') ?? '';

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
