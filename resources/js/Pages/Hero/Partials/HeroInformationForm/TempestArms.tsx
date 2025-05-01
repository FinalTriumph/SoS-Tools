import { HeroTempestArms } from '@/types/entities/hero';
import { TempestArm } from '@/types/entities/tempestArm';
import { groupByType } from '../../../TempestArms/Utils/groupingUtils';
import { Type } from '../../../TempestArms/Utils/TempestArmTypes';
import TempestArmSlot from './TempestArmSlot';

export default function TempestArms({
    tempestArms,
    data,
    setDataField,
    getError,
}: {
    tempestArms: TempestArm[],
    data: HeroTempestArms;
    setDataField: (field: keyof HeroTempestArms, value: number) => void;
    getError: (field: keyof HeroTempestArms) => string | undefined;
}) {
    const groupedTempestArms = groupByType(tempestArms);
    console.log({
        tempestArms,
        groupedTempestArms,
        data,
        setDataField,
        getError,
    });

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-6 text-slate-400">
                <TempestArmSlot
                    type={Type.ATTACK}
                />

                <TempestArmSlot
                    type={Type.DEFENSE}
                />
            </div>

            <div>
                Total Stats
            </div>
        </div>
    );
}
