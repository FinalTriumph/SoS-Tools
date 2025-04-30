import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Player } from '@/types/entities/player';
import { Head } from '@inertiajs/react';
import PlayerInformationForm from './Partials/PlayerInformationForm';
import Mk1InformationForm from './Partials/Mk1InformationForm';
import Mk2InformationForm from './Partials/Mk2InformationForm';
import FormationSystemInformationForm from './Partials/FormationSystemInformationForm';
import ArmyInformationForm from './Partials/ArmyInformationForm';

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
                <div className="grid grid-cols-1 gap-6 mx-auto max-w-7xl sm:grid-cols-2 sm:px-6 lg:px-8">
                    <div className="bg-white py-6 px-4 shadow sm:rounded-lg sm:p-8">
                        <PlayerInformationForm
                            player={player}
                        />
                    </div>

                    <div className="bg-white py-6 px-4 shadow sm:rounded-lg sm:p-8">
                        <ArmyInformationForm
                            playerId={player.id}
                            army={player.army}
                        />
                    </div>

                    <div className="bg-white py-6 px-4 shadow sm:rounded-lg sm:p-8">
                        <Mk1InformationForm
                            playerId={player.id}
                            mk1={player.mk1}
                        />
                    </div>

                    <div className="bg-white py-6 px-4 shadow sm:rounded-lg sm:p-8">
                        <Mk2InformationForm
                            playerId={player.id}
                            mk2={player.mk2}
                        />
                    </div>

                    <div className="bg-white py-6 px-4 shadow sm:rounded-lg sm:p-8">
                        <FormationSystemInformationForm
                            playerId={player.id}
                            formationSystem={player.formation_system}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
