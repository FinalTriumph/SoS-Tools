import PrimaryButton from '@/Components/PrimaryButton';
import { TempestArm } from '@/types';
import { ucfirst } from '@/Utils/stringUtils';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { groupByTroopType } from '../Utils/groupingUtils';
import { TroopType, Type } from '../Utils/TempestArmTypes';
import TempestArmItem from './TempestArmItem';
import ComparisonGrid from './ComparisonGrid';

interface TempestArmsGridProps {
    tempestArms: TempestArm[],
}

export default function TempestArmsGrid({
    tempestArms,
}: TempestArmsGridProps) {
    const [comparisonGridStates, setComparisonGridStates] = useState<Record<TroopType, boolean>>(
        Object.values(TroopType).reduce((acc, troopType) => ({
            ...acc,
            [troopType]: false
        }), {} as Record<TroopType, boolean>)
    );

    const groupedTempestArms = groupByTroopType(tempestArms);

    const toggleComparisonGrid = (troopType: TroopType) => {
        setComparisonGridStates((prevStates) => ({
            ...prevStates,
            [troopType]: !prevStates[troopType],
        }));
    };

    const handleTempestArmClick = (id: number): void => {
        router.visit(route('tempest-arm.edit', id));
    };

    return (
        <>
            {Object.values(TroopType).map((troopType) => (
                <div key={troopType}>
                    <hr className="my-6"/>

                    <div className="flex items-center justify-between">
                        <h3 className="font-bold">{ucfirst(troopType)}</h3>

                        {groupedTempestArms[troopType] && (
                            <PrimaryButton onClick={() => toggleComparisonGrid(troopType)}>
                                {comparisonGridStates[troopType] ? 'Close Comparison' : 'Open Comparison'}
                            </PrimaryButton>
                        )}
                    </div>

                    <ComparisonGrid
                        show={comparisonGridStates[troopType]}
                        tempestArmsByType={groupedTempestArms[troopType]}
                    />

                    {groupedTempestArms[troopType] ? (
                        Object.values(Type).filter(type => (groupedTempestArms[troopType][type] ?? []).length > 0).map(type => (
                            <div
                                key={type}
                                className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                            >
                                {groupedTempestArms[troopType][type].map(tempestArm => (
                                    <div
                                        key={tempestArm.id}
                                        onClick={() => handleTempestArmClick(tempestArm.id)}
                                        role="button"
                                        tabIndex={0}
                                        className="hover:opacity-80"
                                    >
                                        <TempestArmItem tempestArm={tempestArm} />
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <div className="mt-4">
                            <p>{`No tempest arms for ${troopType} added.`}</p>
                        </div>
                    )}
                </div>
            ))}
        </>
    );
};
