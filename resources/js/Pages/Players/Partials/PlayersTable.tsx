import { Player } from '@/types';
import { RefObject } from 'react';
import { FormModalProvider } from '../Utils/FormModalProvider';
import FormModalManager from './FormModalManager';
import PlayerRow from './PlayerRow';

export default function PlayersTable({
    players,
    tableRef,
    showWhenUpdated,
}: {
    players: Player[],
    tableRef: RefObject<HTMLTableElement>;
    showWhenUpdated: boolean;
}) {
    return (
        <div className="overflow-x-auto mt-6">
            <FormModalProvider>
                <table ref={tableRef} className="w-full table-auto">
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
                                showWhenUpdated={showWhenUpdated}
                            />
                        ))}
                    </tbody>
                </table>

                <FormModalManager />
            </FormModalProvider>
        </div>
    );
}
