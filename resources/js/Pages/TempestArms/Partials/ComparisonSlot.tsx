import { TempestArm } from '@/types/entities/tempestArm';
import { ucfirst } from '@/Utils/stringUtils';
import { Type } from '../Utils/TempestArmTypes';
import TempestArmItem from './TempestArmItem';

interface ComparisonSlotProps {
    rowIndex: number;
    slotType: Type;
    slotValue?: TempestArm;
    openModal: (rowIndex: number, slotType: Type) => void;
}

export default function ComparisonSlot({
    rowIndex,
    slotType,
    slotValue,
    openModal,
}: ComparisonSlotProps) {
    return(
        <div
            onClick={() => openModal(rowIndex, slotType)}
            role="button"
            tabIndex={0}
            className="hover:opacity-80"
        >
            {slotValue ? (
                <TempestArmItem tempestArm={slotValue} />
            ) : (
                <div
                    className="w-full h-full min-h-80 bg-slate-50 border-2 border-dashed border-gray-400 font-bold text-gray-600 flex flex-col items-center justify-center p-4 shadow rounded-lg"
                >
                    <div>{ucfirst(slotType)}</div>
                    <div>+</div>
                </div>
            )}
        </div>
    )
};
