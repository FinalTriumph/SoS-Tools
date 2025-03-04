import { Player } from '@/types';
import { Link } from '@inertiajs/react';

interface PlayerRowProps {
    player: Player;
    rank: number;
    onDelete: () => void;
}

export default function PlayerRow({ player, rank, onDelete }: PlayerRowProps) {
    return (
        <tr>
            <td>{rank}</td>
            <td>
                <Link href={route('player.edit', player.id)} className="hover:text-gray-500">
                    {player.username}
                </Link>
            </td>
            <td>{player.behemoths_bp}</td>
            <td>{player.squadron_bp}</td>
            <td>{player.behemoths_bp + player.squadron_bp}</td>
            <td>
                <button
                    type="button"
                    aria-label="Delete Player"
                    className="text-gray-300 hover:text-red-600"
                    onClick={onDelete}
                >
                    &#x2715;
                </button>
            </td>
        </tr>
    );
}
