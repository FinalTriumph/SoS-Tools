import { TempestArm } from '@/types/entities/tempestArm';
import { usePlayersListContext } from '@/Utils/PlayersListContext';
import { ucfirst } from '@/Utils/stringUtils';
import TempestArmItemStats from './TempestArmItemStats';
import TempestArmItemSkill from './TempestArmItemSkill';

interface TempestArmItemProps {
    tempestArm: TempestArm,
    hideOwner?: boolean,
}

export default function TempestArmItem({
    tempestArm,
    hideOwner = false,
}: TempestArmItemProps) {
    const { playersById } = usePlayersListContext();

    return (
        <div
            className="p-4 bg-slate-50 text-sm shadow rounded-lg"
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

            {!hideOwner && (
                <div className="mt-4 mx-2 text-right text-slate-800">
                    {tempestArm.player_id ? playersById[tempestArm.player_id] : '-'}
                </div>
            )}
        </div>
    );
}
