import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import SlideDown from '@/Components/SlideDown';
import { TempestArm, TempestArmStat } from '@/types/entities/tempestArm';
import { generateUniqueId } from '@/Utils/idUtils';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Type } from '../Utils/TempestArmTypes';
import { initializeTotalStats, addStats, subtractStats } from '../Utils/statsUtils';
import TempestArmItem from './TempestArmItem';
import ComparisonSlot from './ComparisonSlot';
import ComparisonTotalStats from './ComparisonTotalStats';

interface ComparisonGridProps {
    show: boolean;
    tempestArmsByType: { [key in Type]?: TempestArm[] };
}

interface ComparisonRow {
    id: string;
    [Type.ATTACK]?: TempestArm;
    [Type.DEFENSE]?: TempestArm;
    totalStats: { [key: string]: TempestArmStat };
}

export default function ComparisonGrid({
    show,
    tempestArmsByType,
}: ComparisonGridProps) {
    const [comparisonRows, setComparisonRows] = useState<ComparisonRow[]>([
        { id: generateUniqueId(),totalStats: initializeTotalStats() },
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
        if (selectedRow === null || selectedSlotType === null) return;

        setComparisonRows(prevRows => {
            const newRows = [...prevRows];
            const currentRow = newRows[selectedRow];
            const slotKey = selectedSlotType;

            const oldTempestArm = currentRow[slotKey];

            if (oldTempestArm?.id === tempestArm.id) {
                return prevRows;
            }

            let updatedTotalStats = { ...currentRow.totalStats };
            if (oldTempestArm) {
                updatedTotalStats = subtractStats(updatedTotalStats, oldTempestArm.stats);
            }

            updatedTotalStats = addStats(updatedTotalStats, tempestArm.stats);

            return prevRows.map((row, index) => index === selectedRow ? { ...row, [slotKey]: tempestArm, totalStats: updatedTotalStats } : row);
        });

        closeModal();
    };

    const addRow = (): void => {
        setComparisonRows([...comparisonRows, { id: generateUniqueId(), totalStats: initializeTotalStats() }]);
    };

    const removeRow = (id: string): void => {
        setComparisonRows(prev => {
            const newRows = prev.filter(row => row.id !== id);
            return newRows.length > 0 ? newRows : [{ id: generateUniqueId(), totalStats: initializeTotalStats() }];
        });
    };

    return (
        <SlideDown show={show}>
            <div className="bg-gray-100 mt-6 p-4 space-y-4 shadow rounded-lg">
                <div className="space-y-4">
                    <AnimatePresence>
                        {comparisonRows.map((row, index) => (
                            <motion.div
                                key={row.id}
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                style={{ overflow: 'hidden' }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                    <ComparisonSlot
                                        rowIndex={index}
                                        slotType={Type.ATTACK}
                                        slotValue={row[Type.ATTACK]}
                                        openModal={openModal}
                                    />

                                    <ComparisonSlot
                                        rowIndex={index}
                                        slotType={Type.DEFENSE}
                                        slotValue={row[Type.DEFENSE]}
                                        openModal={openModal}
                                    />

                                    {(Object.keys(row.totalStats).length > 0 || comparisonRows.length > 1) && (
                                        <>
                                            {(Object.keys(row.totalStats).length > 0) && (
                                                <ComparisonTotalStats stats={row.totalStats} />
                                            )}
                                            <div className="flex items-center justify-center">
                                                <SecondaryButton onClick={() => removeRow(row.id)}>
                                                    Remove Row
                                                </SecondaryButton>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <SecondaryButton onClick={addRow}>
                    Add Row
                </SecondaryButton>

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
                                        className="hover:opacity-80"
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
        </SlideDown>
    );
}
