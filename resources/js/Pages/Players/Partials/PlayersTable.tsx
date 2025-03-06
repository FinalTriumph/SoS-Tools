import { Player } from '@/types';
import { useForm } from '@inertiajs/react';
import PlayerRow from './PlayerRow';

export default function PlayersTable({ players }: { players: Player[] }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number, username: string) => {
        if (confirm(`Are you sure you want to delete ${username}?`)) {
            destroy(route('player.destroy', id), {
                preserveScroll: true,
                onError: () => console.error('Error deleting player'),
            });
        }
    };

    return (
        <table className="w-full table-auto mt-6">
            <thead className="bg-gray-100">
                <tr>
                    <th />
                    <th>Player</th>
                    <th>Behemoths</th>
                    <th>Squadron</th>
                    <th>Behemoths BP + Squadron BP</th>
                    <th>Troops</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {players.map((player, index) => (
                    <PlayerRow
                        key={player.id}
                        player={player}
                        rank={index + 1}
                        onDelete={() => handleDelete(player.id, player.username)}
                    />
                ))}
            </tbody>
        </table>
    );
}
