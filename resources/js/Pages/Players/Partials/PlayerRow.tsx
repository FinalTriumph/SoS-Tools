import { Player } from '@/types';
import { Link } from '@inertiajs/react';
import { FormModalType } from '../Utils/FormModalType';
import { useFormModalContext } from '../Utils/FormModalContext';
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

    const { openModal } = useFormModalContext();

    return (
        <tr className={rowThemes[rank % 2]}>
            <td>{rank}</td>

            <td>{player.alliance || ''}</td>

            <td className="cell-highlighted text-left">
                <Link
                    href={route('player.edit', player.id)}
                    className="hover:text-slate-600"
                >
                    {player.username}
                </Link>
            </td>

            <td
                className={`${showWhenUpdated ? 'flex flex-col p-0' : 'px-3'} cell-clickable`}
                onClick={() => openModal(FormModalType.PLAYER, player)}
                role="button"
                tabIndex={0}
            >
                <div className={`${showWhenUpdated ? 'cell' : ''} cell-highlighted`}>
                    {player.behemoths_bp || '-'}
                </div>

                {showWhenUpdated && (
                    <UpdatedAt date={player.updated_at} className="cell--grow" />
                )}
            </td>

            <td
                className="p-0 min-w-[150px] cell-clickable"
                onClick={() => openModal(FormModalType.MK1, player)}
                role="button"
                tabIndex={0}
            >
                <MkGrid mk={player.mk1} />

                {showWhenUpdated && (
                    <UpdatedAt date={player.mk1?.updated_at || null} />
                )}
            </td>

            <td
                className="p-0 min-w-[150px] cell-clickable"
                onClick={() => openModal(FormModalType.MK2, player)}
                role="button"
                tabIndex={0}
            >
                <MkGrid mk={player.mk2} />

                {showWhenUpdated && (
                    <UpdatedAt date={player.mk2?.updated_at || null} />
                )}
            </td>

            <td
                className={`${showWhenUpdated ? 'flex flex-col p-0' : 'px-3'} cell-clickable`}
                onClick={() => openModal(FormModalType.PLAYER, player)}
                role="button"
                tabIndex={0}
            >
                <div className={`${showWhenUpdated ? 'cell' : ''} cell-highlighted`}>
                    {player.squadron_bp || '-'}
                </div>

                {showWhenUpdated && (
                    <UpdatedAt date={player.updated_at} className="cell--grow" />
                )}
            </td>

            <td
                className="p-0 min-w-[150px] cell-clickable"
                onClick={() => openModal(FormModalType.FORMATION_SYSTEM, player)}
                role="button"
                tabIndex={0}
            >
                <FormationSystemGrid formationSystem={player.formation_system} />

                {showWhenUpdated && (
                    <UpdatedAt date={player.formation_system?.updated_at ?? null} />
                )}
            </td>

            <td
                className="p-0 cell-clickable"
                onClick={() => openModal(FormModalType.PLAYER, player)}
                role="button"
                tabIndex={0}
            >
                <div className="flex flex-col h-full">
                    <PlaneStarsCell stars={player.fa1_stars || 0} />

                    {showWhenUpdated && (
                        <UpdatedAt date={player.updated_at} />
                    )}
                </div>
            </td>

            <td
                className={`${showWhenUpdated ? 'flex flex-col p-0' : 'px-3'} cell-clickable`}
                onClick={() => openModal(FormModalType.PLAYER, player)}
                role="button"
                tabIndex={0}
            >
                <div className={`${showWhenUpdated ? 'cell' : ''} cell-highlighted`}>
                    {(player.behemoths_bp || player.squadron_bp) ? ((player.behemoths_bp || 0) + (player.squadron_bp || 0)) : '-'}
                </div>

                {showWhenUpdated && (
                    <UpdatedAt date={player.updated_at} className="cell--grow" />
                )}
            </td>

            <td
                className="p-0 min-w-[90px] cell-clickable"
                onClick={() => openModal(FormModalType.ARMY, player)}
                role="button"
                tabIndex={0}
            >
                <TroopsGrid army={player.army} />

                {showWhenUpdated && (
                    <UpdatedAt date={player.army?.updated_at || null} />
                )}
            </td>

            <td className="cell-highlighted text-left">
                <Link href={route('player.edit', player.id)} className="hover:text-gray-500">
                    {player.username}
                </Link>
            </td>

            <td>{rank}</td>
        </tr>
    );
}
