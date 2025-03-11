import { Player } from '@/types';
import { Link } from '@inertiajs/react';
import MkGrid from './MkGrid';
import FormationSystemGrid from './FormationSystemGrid';
import PlaneStarsCell from './PlaneStarsCell';
import TroopsGrid from './TroopsGrid';

interface PlayerRowProps {
    player: Player;
    rank: number;
    onDelete: () => void;
}

export default function PlayerRow({ player, rank, onDelete }: PlayerRowProps) {
    const rowThemes = [
        'bg-custom-tr-1 border-b border-custom-tr-1-b',
        'bg-custom-tr-2 border-b border-custom-tr-2-b',
    ];

    return (
        <tr className={rowThemes[rank % 2]}>
            <td>{rank}</td>
            <td>{player.alliance || ''}</td>
            <td>
                <Link href={route('player.edit', player.id)} className="hover:text-gray-500">
                    {player.username}
                </Link>
            </td>
            <td className="border-r-0">{player.behemoths_bp || '-'}</td>
            <td className="p-0 border-r-0">
                <MkGrid mk={player.mk1} />
            </td>
            <td className="p-0">
                <MkGrid mk={player.mk2} />
            </td>
            <td className="border-r-0">{player.squadron_bp || '-'}</td>
            <td className="p-0">
                <FormationSystemGrid formationSystem={player.formation_system} />
            </td>
            <PlaneStarsCell stars={player.fa1_stars || 0} />
            <td className="border-r-0">
                {(player.behemoths_bp || player.squadron_bp) ? ((player.behemoths_bp || 0) + (player.squadron_bp || 0)) : '-'}
            </td>
            <td className="p-0">
                <TroopsGrid army={player.army} />
            </td>
            <td>
                <Link href={route('player.edit', player.id)} className="hover:text-gray-500">
                    {player.username}
                </Link>
            </td>
            <td>{rank}</td>
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
