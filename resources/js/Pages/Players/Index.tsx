import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Player } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useRef } from 'react';
import Filters from './Partials/Filters';
import ImageOptions from './Partials/ImageOptions';
import PlayersTable from './Partials/PlayersTable';

export default function Index({
    players,
    alliances,
    topCount,
    alliance,
    rankBy,
}: {
    players: Player[],
    alliances: string[],
    topCount: number,
    alliance: string | null,
    rankBy: string | null,
}) {
    const handleAddNewPlayerClick = () => {
        router.visit(route('player.create'));
    };

    const tableRef = useRef<HTMLTableElement>(null);

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

                            {(players.length > 0) && (
                                <div>
                                    <hr className="my-6"/>

                                    <div className="flex flex-col lg:flex-row justify-start lg:justify-between lg:items-end">
                                        <Filters
                                            alliances={alliances}
                                            topCount={topCount}
                                            alliance={alliance}
                                            rankBy={rankBy}
                                        />

                                        <hr className="my-6 lg:hidden"/>

                                        <ImageOptions tableRef={tableRef} />
                                    </div>

                                    <PlayersTable
                                        players={players}
                                        tableRef={tableRef}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
