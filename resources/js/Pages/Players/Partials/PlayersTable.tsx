import { Player } from '@/types';
import { RefObject } from 'react';
import PlayerRow from './PlayerRow';

export default function PlayersTable({
    players,
    tableRef
}: {
    players: Player[],
    tableRef: RefObject<HTMLTableElement>;
}) {
    return (
        <table ref={tableRef} className="w-full table-auto mt-6">
            <thead className="bg-gray-100">
                <tr>
                    <th rowSpan={2} />
                    <th rowSpan={2} colSpan={2}>Player</th>
                    <th colSpan={3}>Behemoths</th>
                    <th colSpan={3}>Squadron</th>
                    <th rowSpan={2}>Behemoths BP<br />+<br />Squadron BP</th>
                    <th rowSpan={2}>Troops</th>
                    <th rowSpan={2}>Player</th>
                    <th rowSpan={2} />
                </tr>
                <tr>
                    <th>BP</th>
                    <th>MK1</th>
                    <th>MK2</th>
                    <th>BP</th>
                    <th>Formation System</th>
                    <th>FA-1 Specter</th>
                </tr>
            </thead>
            <tbody>
                {players.map((player, index) => (
                    <PlayerRow
                        key={player.id}
                        player={player}
                        rank={index + 1}
                    />
                ))}
            </tbody>
        </table>
    );
}
