import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import { useState } from 'react';
import { TempestArm } from '@/types';
import { ucfirst } from '../../../Utils/stringUtils';
import { Type } from '../Utils/TempestArmTypes';
import TempestArmItem from './TempestArmItem';
import ComparisonTotalStats from './ComparisonTotalStats';

interface ComparisonGridProps {
    tempestArmsByType: { [key in Type]?: TempestArm[] };
}

interface ComparisonRow {
    attack: TempestArm | null;
    defense: TempestArm | null;
    totalStats: { [key: string]: { value: number; is_percentage: boolean } };
}

export default function ComparisonGrid({
    tempestArmsByType,
}: ComparisonGridProps) {
    const [comparisonRows, setComparisonRows] = useState<ComparisonRow[]>([
        { attack: null, defense: null, totalStats: {} },
    ]);

    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [selectedSlotType, setSelectedSlotType] = useState<Type | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = (rowIndex: number, slotType: Type): void => {
        setSelectedRow(rowIndex);
        setSelectedSlotType(slotType);
        setIsModalOpen(true);
    };

    const closeModal = (): void => {
        setIsModalOpen(false);
    };

    const selectTempestArm = (tempestArm: TempestArm): void => {
        if (selectedRow === null || selectedSlotType === null) {
            return;
        }

        const newRows = [...comparisonRows];
        if (selectedSlotType === Type.ATTACK) {
            newRows[selectedRow].attack = tempestArm;

            tempestArm.stats.forEach((stat) => {
                const statName = stat.name?.replace(' ', '_') ?? '';
                if (!newRows[selectedRow].totalStats[statName]) {
                    newRows[selectedRow].totalStats[statName] = {
                        value: 0,
                        is_percentage: stat.is_percentage ?? false,
                    };
                }

                newRows[selectedRow].totalStats[statName].value += stat.value ?? 0;
            });
        } else {
            newRows[selectedRow].defense = tempestArm;

            tempestArm.stats.forEach((stat) => {
                const statName = stat.name?.replace(' ', '_') ?? '';
                if (!newRows[selectedRow].totalStats[statName]) {
                    newRows[selectedRow].totalStats[statName] = {
                        value: 0,
                        is_percentage: stat.is_percentage ?? false,
                    };
                }

                newRows[selectedRow].totalStats[statName].value += stat.value ?? 0;
            });
        }

        setComparisonRows(newRows);
        closeModal();
    };

    const getSlotContent = (rowIndex: number, slotType: Type) => {
        const slotValue = comparisonRows[rowIndex][slotType];

        if (slotValue) {
            return <TempestArmItem tempestArm={slotValue} />;
        }

        return (
            <div
                className="w-full h-64 border-2 border-dashed border-gray-400 flex flex-col items-center justify-center cursor-pointer p-4"
                onClick={() => openModal(rowIndex, slotType)}
            >
                <div>{ucfirst(slotType)}</div>
                <div>+</div>
            </div>
        );
    };

    const addRow = () => {
        setComparisonRows([...comparisonRows, { attack: null, defense: null, totalStats: {} }]);
    };

    const removeRow = (rowIndex: number) => {
        if (!rowIndex) {
            return;
        }
        
        setComparisonRows(comparisonRows.filter((_, index) => index !== rowIndex));
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                {comparisonRows.map((row, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {getSlotContent(index, Type.ATTACK)}
                        {getSlotContent(index, Type.DEFENSE)}

                        <ComparisonTotalStats stats={row.totalStats} />

                        {index > 0 && (
                            <div className="flex items-center justify-center">
                                <SecondaryButton onClick={() => removeRow(index)}>
                                    Remove Row
                                </SecondaryButton>
                            </div>
                        )}

                    </div>
                ))}
            </div>

            <SecondaryButton onClick={addRow}>
                Add Row
            </SecondaryButton>

            <hr className="my-6"/>

            <Modal show={isModalOpen} onClose={closeModal}>
                <div
                    style={{ maxHeight: '90vh' }}
                    className="w-full overflow-y-auto p-8"
                >
                    {selectedSlotType && tempestArmsByType[selectedSlotType] ? (
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {tempestArmsByType[selectedSlotType].map((arm) => (
                                <div
                                    key={arm.id}
                                    onClick={() => selectTempestArm(arm)}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <TempestArmItem tempestArm={arm} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>{`No ${selectedSlotType} tempest arms available.`}</div>
                    )}

                    <button
                        type="button"
                        className="absolute top-2 right-3 text-lg font-bold text-slate-600 hover:text-slate-800"
                        onClick={closeModal}
                    >
                        &#x2715;
                    </button>
                </div>
            </Modal>
        </div>
    );
}
