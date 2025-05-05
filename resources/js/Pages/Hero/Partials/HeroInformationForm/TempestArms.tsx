import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import { HeroTempestArmsIds } from '@/types/entities/hero';
import { TempestArm, TempestArmStat } from '@/types/entities/tempestArm';
import { useState, useEffect } from 'react';
import { groupByType } from '../../../TempestArms/Utils/groupingUtils';
import { initializeTotalStats, addStats, subtractStats } from '../../../TempestArms/Utils/statsUtils';
import { Type } from '../../../TempestArms/Utils/TempestArmTypes';
import TempestArmItem from '../../../TempestArms/Partials/TempestArmItem';
import ComparisonTotalStats from '../../../TempestArms/Partials/ComparisonTotalStats';
import TempestArmSlot from './TempestArmSlot';

interface TempestArmsProps {
    tempestArms: TempestArm[],
    data: HeroTempestArmsIds;
    setDataField: (field: keyof HeroTempestArmsIds, value: number) => void;
    getError: (field: keyof HeroTempestArmsIds) => string | undefined;
}

export default function TempestArms({
    tempestArms,
    data,
    setDataField,
    getError,
}: TempestArmsProps) {
    const [selectedSlotType, setSelectedSlotType] = useState<Type | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [totalStats, setTotalStats] = useState<Record <string, TempestArmStat>>(initializeTotalStats());

    const groupedTempestArms = groupByType(tempestArms);
    
    const fieldNamesByType: { [key in Type]: keyof HeroTempestArmsIds } = {
        [Type.ATTACK]: 'attack_tempest_arm_id',
        [Type.DEFENSE]: 'defense_tempest_arm_id',
    };

    const getTempestArm = (type: Type, id: number | null): TempestArm | null => {
        return id !== null && groupedTempestArms[type]?.[id] || null;
    };

    useEffect(() => {
        let newTotalStats = initializeTotalStats();

        const attackTempestArm = getTempestArm(Type.ATTACK, data[fieldNamesByType[Type.ATTACK]]);
        if (attackTempestArm) {
            newTotalStats = addStats(newTotalStats, attackTempestArm.stats);
        }

        const defenseTempestArm = getTempestArm(Type.DEFENSE, data[fieldNamesByType[Type.DEFENSE]]);
        if (defenseTempestArm) {
            newTotalStats = addStats(newTotalStats, defenseTempestArm.stats);
        }

        setTotalStats(newTotalStats);
    }, []);

    const openModal = (slotType: Type): void => {
        setSelectedSlotType(slotType);
        setIsModalOpen(true);
    };

    const closeModal = (): void => {
        setIsModalOpen(false);
    };

    const selectTempestArm = (tempestArm: TempestArm, field: keyof HeroTempestArmsIds): void => {
        if (selectedSlotType === null) return;

        const oldTempestArmId = data[field];
        if (oldTempestArmId === tempestArm.id) {
            closeModal();
            return;
        };

        let updatedTotalStats = { ...totalStats };
        if (oldTempestArmId) {
            const oldTempestArm = getTempestArm(selectedSlotType, oldTempestArmId);
            if (oldTempestArm) {
                updatedTotalStats = subtractStats(updatedTotalStats, oldTempestArm.stats);
            }
        }

        updatedTotalStats = addStats(updatedTotalStats, tempestArm.stats);
        setTotalStats(updatedTotalStats);

        setDataField(field, tempestArm.id);

        closeModal();
    };

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-6">
                <div className="space-y-2">
                    <TempestArmSlot
                        type={Type.ATTACK}
                        tempestArm={getTempestArm(Type.ATTACK, data[fieldNamesByType[Type.ATTACK]])}
                        openModal={openModal}
                    />

                    <InputError message={getError('attack_tempest_arm_id')} />
                </div>

                <div className="space-y-2">
                    <TempestArmSlot
                        type={Type.DEFENSE}
                        tempestArm={getTempestArm(Type.DEFENSE, data[fieldNamesByType[Type.DEFENSE]])}
                        openModal={openModal}
                    />

                    <InputError message={getError('defense_tempest_arm_id')} />
                </div>
            </div>

            {totalStats && (
                <ComparisonTotalStats stats={totalStats} />
            )}

            <Modal show={isModalOpen} onClose={closeModal}>
                <div
                    style={{ maxHeight: '90vh' }}
                    className="w-full overflow-y-auto p-8"
                >
                    {selectedSlotType && groupedTempestArms[selectedSlotType] ? (
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {Object.values(groupedTempestArms[selectedSlotType]).map((tempestArm) => (
                                <div
                                    key={tempestArm.id}
                                    onClick={() => selectTempestArm(tempestArm, fieldNamesByType[selectedSlotType])}
                                    role="button"
                                    tabIndex={0}
                                    className="hover:opacity-80"
                                >
                                    <TempestArmItem tempestArm={tempestArm} />
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
