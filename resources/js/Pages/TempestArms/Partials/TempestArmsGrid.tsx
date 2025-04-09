import { TempestArm } from '@/types';
import { ucfirst } from '../../../Utils/stringUtils';
import { groupByTroopType } from '../Utils/groupingUtils';
import { TroopType, Type } from '../Utils/TempestArmTypes';
import TempestArmItem from './TempestArmItem';

interface TempestArmsGridProps {
    tempestArms: TempestArm[],
}

export default function TempestArmsGrid({
    tempestArms,
}: TempestArmsGridProps) {
    const groupedTempestArms = groupByTroopType(tempestArms);

    return (
        <>
            {Object.values(TroopType).map((troopType) => (
                <div
                    key={troopType}
                    className="space-y-6"
                >
                    <hr className="my-6"/>

                    <h3 className="font-bold">{ucfirst(troopType)}</h3>

                    {Object.values(Type).map((type) => (
                        <div
                            key={type}
                            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                        >
                            {(groupedTempestArms[troopType]?.[type] ?? []).map((tempestArm) => (
                                <TempestArmItem
                                    key={tempestArm.id}
                                    tempestArm={tempestArm}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
};
