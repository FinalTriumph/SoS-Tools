import { TempestArm } from '@/types';
import { groupByTroopType } from '../Utils/groupingUtils';
import TempestArmsTroopTypeBlock from './TempestArmsTroopTypeBlock';

interface TempestArmsGridProps {
    tempestArms: TempestArm[],
    playersById: Record<number, string>,
}

export default function TempestArmsGrid({
    tempestArms,
    playersById,
}: TempestArmsGridProps) {
    const groupedTempestArms = groupByTroopType(tempestArms);

    return (
        <>
            {Object.keys(groupedTempestArms).map((troopType) => (
                <TempestArmsTroopTypeBlock
                    key={troopType}
                    troopType={troopType}
                    tempestArmsByType={groupedTempestArms[troopType]}
                    playersById={playersById}
                />
            ))}
        </>
    );
};
