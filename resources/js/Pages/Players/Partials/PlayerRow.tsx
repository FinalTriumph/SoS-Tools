import { Player } from '@/types';
import { Link } from '@inertiajs/react';
import MkGrid from './MkGrid';
import FormationSystemGrid from './FormationSystemGrid';
import PlaneStarsCell from './PlaneStarsCell';
import TroopsGrid from './TroopsGrid';
import UpdatedAt from './UpdatedAt';

interface PlayerRowProps {
    player: Player;
    rank: number;
    showWhenUpdated: boolean;
}

export default function PlayerRow({ player, rank, showWhenUpdated }: PlayerRowProps) {
    const rowThemes = [
        'bg-slate-200 border-b border-slate-600',
        'bg-slate-100 border-b border-slate-500',
    ];

    return (
        <tr className={rowThemes[rank % 2]}>
            <td>{rank}</td>

            <td>{player.alliance || ''}</td>

            <td className="text-left">
                <Link href={route('player.edit', player.id)} className="hover:text-gray-500">
                    {player.username}
                </Link>
            </td>

            <td className={showWhenUpdated ? 'flex flex-col p-0' : 'px-3'}>
                <div className={showWhenUpdated ? 'cell cell--grow' : ''}>
                    {player.behemoths_bp || '-'}
                </div>

                {showWhenUpdated && (
                    <UpdatedAt date={player.updated_at} />
                )}
            </td>

            <td className="p-0 min-w-[150px]">
                <MkGrid mk={player.mk1} />

                {showWhenUpdated && (
                    <UpdatedAt date={player.mk1?.updated_at || null} />
                )}
            </td>

            <td className="p-0 min-w-[150px]">
                <MkGrid mk={player.mk2} />

                {showWhenUpdated && (
                    <UpdatedAt date={player.mk2?.updated_at || null} />
                )}
            </td>

            <td className={showWhenUpdated ? 'flex flex-col p-0' : 'px-3'}>
                <div className={showWhenUpdated ? 'cell cell--grow' : ''}>
                    {player.squadron_bp || '-'}
                </div>

                {showWhenUpdated && (
                    <UpdatedAt date={player.updated_at} />
                )}
            </td>

            <td className="p-0 min-w-[150px]">
                <FormationSystemGrid formationSystem={player.formation_system} />

                {showWhenUpdated && (
                    <UpdatedAt date={player.formation_system?.updated_at ?? null} />
                )}
            </td>

            <td className="p-0">
                <div className="flex flex-col h-full">
                    <PlaneStarsCell stars={player.fa1_stars || 0} />

                    {showWhenUpdated && (
                        <UpdatedAt date={player.updated_at} />
                    )}
                </div>
            </td>

            <td className={showWhenUpdated ? 'flex flex-col p-0' : 'px-3'}>
                <div className={showWhenUpdated ? 'cell cell--grow' : ''}>
                    {(player.behemoths_bp || player.squadron_bp) ? ((player.behemoths_bp || 0) + (player.squadron_bp || 0)) : '-'}
                </div>

                {showWhenUpdated && (
                    <UpdatedAt date={player.updated_at} />
                )}
            </td>

            <td className="p-0 min-w-[90px]">
                <TroopsGrid army={player.army} />

                {showWhenUpdated && (
                    <UpdatedAt date={player.army?.updated_at || null} />
                )}
            </td>

            <td className="text-left">
                <Link href={route('player.edit', player.id)} className="hover:text-gray-500">
                    {player.username}
                </Link>
            </td>

            <td>{rank}</td>
        </tr>
    );
}
