export enum TroopType {
    INFANTRY = 'infantry',
    RIDER = 'riders',
    HUNTER = 'hunters',
}

export enum Type {
    ATTACK = 'attack',
    DEFENSE = 'defense',
}

export const isValidTroopType = (type: string | null): type is TroopType => {
    return Object.values(TroopType).includes(type as TroopType);
}

export const isValidType = (type: string | null): type is Type => {
    return Object.values(Type).includes(type as Type);
}

export const isValidTroopTypeAndType = (troopType: string | null, type: string | null): boolean => {
    return isValidTroopType(troopType) && isValidType(type);
}
