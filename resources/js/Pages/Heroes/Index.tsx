import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Hero } from '@/types/entities/hero';
import { PlayersListProvider } from '@/Utils/PlayersListProvider';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import HeroesGrid from './Partials/HeroesGrid';

interface IndexProps {
    heroes: Hero[],
    players: { id: number; username: string }[],
    selectedPlayerId: number | null,
}

export default function Index({
    heroes,
    players,
    selectedPlayerId
}: IndexProps) {
    const [selectedPlayer, setSelectedPlayer] = useState<number | null>(selectedPlayerId);

    const handleAddNewHeroClick = () => {
        router.visit(route('hero.create'));
    };

    const handlePlayerChange = (id: string) => {
        let playerId = id ? Number(id) : null;

        setSelectedPlayer(playerId);
        router.visit(route('heroes.index', playerId ?? undefined), { preserveScroll: true });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Heroes
                </h2>
            }
        >
            <Head title="Heroes" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <SecondaryButton onClick={handleAddNewHeroClick}>
                                Add New Hero
                            </SecondaryButton>

                            <hr className="my-6"/>

                            <div className="max-w-sm">
                                <InputLabel htmlFor="player_id" value="Player" />
                
                                <SelectInput
                                    id="player_id"
                                    name="player_id"
                                    value={selectedPlayer || ''}
                                    options={[
                                        { value: '', label: '' },
                                        ...(players?.map(player => ({
                                            value: player.id,
                                            label: player.username,
                                        })) || [])
                                    ]}
                                    className="mt-1 block w-full"
                                    onChange={(e) => handlePlayerChange(e.target.value)}
                                />
                            </div>

                            {(heroes.length > 0) && (
                                <PlayersListProvider players={players}>
                                    <HeroesGrid
                                        heroes={heroes}
                                    />
                                </PlayersListProvider>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
