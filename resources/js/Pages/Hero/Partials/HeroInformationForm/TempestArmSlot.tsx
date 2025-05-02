import { TempestArm } from '@/types/entities/tempestArm';
import { ucfirst } from '@/Utils/stringUtils';
import { Type } from '../../../TempestArms/Utils/TempestArmTypes';
import TempestArmItem from '../../../TempestArms/Partials/TempestArmItem';

interface TempestArmSlotProps {
    type: Type;
    tempestArm: TempestArm | null;
    openModal: (type: Type) => void;
}

export default function TempestArmSlot({
    type,
    tempestArm,
    openModal,
}: TempestArmSlotProps) {
    return (
        <div
            onClick={() => openModal(type)}
            role="button"
            tabIndex={0}
            className="hover:opacity-80"
        >
            {tempestArm ? (
                <TempestArmItem tempestArm={tempestArm} />
            ) : (
                <div
                    className="w-full h-full min-h-80 bg-slate-50 border-2 border-dashed border-gray-400 font-bold text-gray-600 flex flex-col items-center justify-center p-4 shadow rounded-lg"
                >
                    <div>{ucfirst(type)}</div>
                    <div>+</div>
                </div>
            )}
        </div>
    )
};
