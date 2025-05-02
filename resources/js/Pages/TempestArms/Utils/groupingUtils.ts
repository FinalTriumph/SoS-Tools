import { TempestArm } from '@/types/entities/tempestArm';
import { isValidTroopTypeAndType, TroopType, Type } from './TempestArmTypes';

type GroupedByType = Record<Type, Record<number, TempestArm>>;
type GroupedByTroopType = Record<TroopType, Record<string, TempestArm[]>>;

export const groupByType = (
    tempestArms: TempestArm[]
): GroupedByType => {
    return tempestArms.reduce((acc, tempestArm) => {
        if (!isValidTroopTypeAndType(tempestArm.troop_type, tempestArm.type)) {
            return acc;
        }

        acc[tempestArm.type as Type] ??= {};
        acc[tempestArm.type as Type][tempestArm.id] = tempestArm;

        return acc;
    }, {} as GroupedByType);
};

export const groupByTroopType = (
    tempestArms: TempestArm[]
): GroupedByTroopType => {
    return tempestArms.reduce((acc, tempestArm) => {
        if (!isValidTroopTypeAndType(tempestArm.troop_type, tempestArm.type)) {
            return acc;
        }

        acc[tempestArm.troop_type as TroopType] ??= {};
        acc[tempestArm.troop_type as TroopType][tempestArm.type as Type] ??= [];

        acc[tempestArm.troop_type as TroopType][tempestArm.type as Type].push(tempestArm);

        return acc;
    }, {} as GroupedByTroopType);
};
