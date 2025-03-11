import PrimaryButton from '@/Components/PrimaryButton';
import { Player } from '@/types';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import PlayerRow from './PlayerRow';

export default function PlayersTable({ players }: { players: Player[] }) {
    const { delete: destroy } = useForm();
    const tableRef = useRef<HTMLTableElement>(null);

    const handleDelete = (id: number, username: string) => {
        if (confirm(`Are you sure you want to delete ${username}?`)) {
            destroy(route('player.destroy', id), {
                preserveScroll: true,
                onError: () => console.error('Error deleting player'),
            });
        }
    };

    const handleDownload = async () => {
        if (!tableRef.current) return;
    
        const canvas = await html2canvas(tableRef.current, {
            scale: 2,
        });
    
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = `st_players.png`;
        link.click();
    };

    return (
        <div>
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
                        <th rowSpan={2}/>
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
                            onDelete={() => handleDelete(player.id, player.username)}
                        />
                    ))}
                </tbody>
            </table>

            <PrimaryButton
                className="mt-6"
                onClick={() => handleDownload()}
            >
                Download
            </PrimaryButton>
        </div>
    );
}
