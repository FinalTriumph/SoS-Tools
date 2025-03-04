import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Player } from '@/types';
import { Head } from '@inertiajs/react';
import UpdatePlayerInformationForm from './Partials/UpdatePlayerInformationForm';
import UpdateMk1InformationForm from './Partials/UpdateMk1InformationForm';
import UpdateMk2InformationForm from './Partials/UpdateMk2InformationForm';
import UpdateFormationSystemInformationForm from './Partials/UpdateFormationSystemInformationForm';

export default function Edit({ player }: { player: Player }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Player
                </h2>
            }
        >
            <Head title="Edit Player" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePlayerInformationForm
                            player={player}
                        />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateMk1InformationForm
                            playerId={player.id}
                            mk1={player.mk1}
                        />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateMk2InformationForm
                            playerId={player.id}
                            mk2={player.mk2}
                        />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateFormationSystemInformationForm
                            playerId={player.id}
                            formationSystem={player.formation_system}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
