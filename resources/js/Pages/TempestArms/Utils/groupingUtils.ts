import { TempestArm } from '@/types';

type GroupedTempestArms = Record<string, Record<string, TempestArm[]>>;

export const groupByTroopType = (
    tempestArms: TempestArm[]
): GroupedTempestArms => {
    return tempestArms.reduce((acc, tempestArm) => {
        if (!tempestArm.troop_type || !tempestArm.type) {
            return acc;
        }

        acc[tempestArm.troop_type] ??= {};
        acc[tempestArm.troop_type][tempestArm.type] ??= [];

        acc[tempestArm.troop_type][tempestArm.type].push(tempestArm);

        return acc;
    }, {} as GroupedTempestArms);
};
