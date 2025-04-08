import { TempestArm } from '@/types';
import TempestArmItem from './TempestArmItem';

interface TempestArmsTypeColumnProps {
    type: string;
    tempestArms: TempestArm[];
    playersById: Record<number, string>;
}

export default function TempestArmsTypeColumn({
    type,
    tempestArms,
    playersById,
}: TempestArmsTypeColumnProps) {
    return (
        <div className="space-y-4">
            {tempestArms.map((tempestArm, index) => (
                <TempestArmItem
                    key={index}
                    tempestArm={tempestArm}
                    playerUsername={tempestArm.player_id ? playersById[tempestArm.player_id] : '-'}
                />
            ))}
        </div>
    );
}
