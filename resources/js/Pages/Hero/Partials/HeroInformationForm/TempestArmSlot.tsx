import { TempestArm } from '@/types/entities/tempestArm';
import { ucfirst } from '@/Utils/stringUtils';
import { Type } from '../../../TempestArms/Utils/TempestArmTypes';
import TempestArmItem from '../../../TempestArms/Partials/TempestArmItem';

interface TempestArmSlotProps {
    type: Type;
    tempestArm: TempestArm | null;
    openModal: (type: Type) => void;
    removeTempestArm: (tempestArm: TempestArm, type: Type) => void;
}

export default function TempestArmSlot({
    type,
    tempestArm,
    openModal,
    removeTempestArm,
}: TempestArmSlotProps) {
    return (
        <>
            {tempestArm ? (
                <div className="text-right">
                    <div
                        onClick={() => openModal(type)}
                        role="button"
                        tabIndex={0}
                        className="hover:opacity-80"
                    >
                        <TempestArmItem tempestArm={tempestArm} hideOwner />
                    </div>

                    <button
                        type="button"
                        className="text-sm mt-2 mr-4 font-bold text-slate-600 hover:text-slate-800"
                        onClick={() => removeTempestArm(tempestArm, type)}
                    >
                        &#x2715; Remove
                    </button>
                </div>
            ) : (
                <div
                    onClick={() => openModal(type)}
                    role="button"
                    tabIndex={0}
                    className="w-full h-full min-h-80 bg-slate-50 border-2 border-dashed border-gray-400 font-bold text-gray-600 flex flex-col items-center justify-center p-4 shadow rounded-lg hover:opacity-80"
                >
                    <div>{ucfirst(type)}</div>
                    <div>+</div>
                </div>
            )}
        </>
    )
};
