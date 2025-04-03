import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { TempestArm } from '@/types';
import { Head, router } from '@inertiajs/react';
import TempestArmItem from './Partials/TempestArmItem';

interface IndexProps {
    tempestArms: TempestArm[],
    players: { id: number; username: string }[];
}

export default function Index({
    tempestArms,
    players,
}: IndexProps) {
    const handleAddNewTempestArmClick = () => {
        router.visit(route('tempest-arm.create'));
    };

    const playersById = Object.fromEntries(players.map((player) => [player.id, player.username]));

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tempest Arms
                </h2>
            }
        >
            <Head title="Tempest Arms" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <SecondaryButton onClick={handleAddNewTempestArmClick}>
                                Add New Tempest Arm
                            </SecondaryButton>

                            {(tempestArms.length > 0) && (
                                <div>
                                    <hr className="my-6"/>

                                    <div className="grid grid-cols-4 gap-4">
                                        {tempestArms.map((tempestArm, index) => (
                                            <TempestArmItem
                                                key={index}
                                                tempestArm={tempestArm}
                                                playerUsername={tempestArm.player_id ? playersById[tempestArm.player_id] : '-'}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
