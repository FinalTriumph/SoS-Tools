import { TempestArm } from '@/types';
import TempestArmsTypeColumn from './TempestArmsTypeColumn';

interface TempestArmsTroopTypeBlockProps {
    troopType: string;
    tempestArmsByType: Record<string, TempestArm[]>;
    playersById: Record<number, string>;
}

export default function TempestArmsTroopTypeBlock({
    troopType,
    tempestArmsByType,
    playersById,
}: TempestArmsTroopTypeBlockProps) {
    const ucfirst = (str: string | null): string => {
        if (!str) {
            return '';
        }

        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className="space-y-6">
            <hr className="my-6"/>

            <h3 className="font-bold">{ucfirst(troopType)}</h3>

            <div className="flex gap-4">
                {Object.keys(tempestArmsByType).map((type) => (
                    <TempestArmsTypeColumn
                        key={type}
                        type={type}
                        tempestArms={tempestArmsByType[type]}
                        playersById={playersById}
                    />
                ))}
            </div>
        </div>
    );
}
