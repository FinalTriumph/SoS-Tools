import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Player } from '@/types';
import { Head, router } from '@inertiajs/react';
import PlayersTable from './Partials/PlayersTable';

export default function Index({ players }: { players: Player[] }) {
    const handleAddNewPlayerClick = () => {
        router.visit(route('player.create'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Players
                </h2>
            }
        >
            <Head title="Players" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <SecondaryButton onClick={handleAddNewPlayerClick}>
                                Add New Player
                            </SecondaryButton>

                            {(players.length > 0) && <PlayersTable players={players} />}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
