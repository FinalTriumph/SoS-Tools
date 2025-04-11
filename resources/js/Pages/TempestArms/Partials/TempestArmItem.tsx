import { TempestArm } from '@/types';
import { ucfirst } from '../../../Utils/stringUtils';
import { usePlayersContext } from '../Utils/PlayersContext';
import TempestArmItemStats from './TempestArmItemStats';
import TempestArmItemSkill from './TempestArmItemSkill';

interface TempestArmItemProps {
    tempestArm: TempestArm,
}

export default function TempestArmItem({
    tempestArm,
}: TempestArmItemProps) {
    const { playersById } = usePlayersContext();

    return (
        <div
            className="p-4 bg-slate-100 text-sm"
        >
            <div className="flex justify-between items-center font-bold">
                <div>{ucfirst(tempestArm.type)}</div>
                <div className="inline-block p-2 bg-orange-200 rounded-lg">
                    {ucfirst(tempestArm.generation)}
                </div>
            </div>

            {tempestArm.stats && (
                <TempestArmItemStats stats={tempestArm.stats} />
            )}

            {tempestArm.skill && (
                <TempestArmItemSkill skill={tempestArm.skill} />
            )}

            <div className="mt-4 mx-2 text-right text-slate-800">
                {tempestArm.player_id ? playersById[tempestArm.player_id] : '-'}
            </div>
        </div>
    );
}
