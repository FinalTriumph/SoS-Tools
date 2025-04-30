import { TempestArm } from '@/types/entities/tempestArm';
import { isValidTroopTypeAndType, TroopType, Type } from './TempestArmTypes';

type GroupedTempestArms = Record<string, Record<string, TempestArm[]>>;

export const groupByTroopType = (
    tempestArms: TempestArm[]
): GroupedTempestArms => {
    return tempestArms.reduce((acc, tempestArm) => {
        if (!isValidTroopTypeAndType(tempestArm.troop_type, tempestArm.type)) {
            return acc;
        }

        acc[tempestArm.troop_type as TroopType] ??= {};
        acc[tempestArm.troop_type as TroopType][tempestArm.type as Type] ??= [];

        acc[tempestArm.troop_type as TroopType][tempestArm.type as Type].push(tempestArm);

        return acc;
    }, {} as GroupedTempestArms);
};
