import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Player } from '@/types';
import { Head, Link } from '@inertiajs/react';
import PlayersTable from './Partials/PlayersTable';

export default function Index({ players }: { players: Player[] }) {
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
                            <Link
                                href={route('player.create')}
                                className="rounded-md text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Add New Player
                            </Link>

                            {(players.length > 0) && <PlayersTable players={players} />}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
