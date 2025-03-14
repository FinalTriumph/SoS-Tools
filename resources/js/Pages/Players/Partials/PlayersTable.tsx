import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Player } from '@/types';
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import PlayerRow from './PlayerRow';

export default function PlayersTable({ players }: { players: Player[] }) {
    const tableRef = useRef<HTMLTableElement>(null);

    const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);

    const showImagePreview = async () => {
        if (!tableRef.current) return;

        setIsImagePreviewOpen(true);
    
        const canvas = await html2canvas(tableRef.current, {
            scale: 2,
        });
    
        const dataURL = canvas.toDataURL('image/png');
        setPreviewImage(dataURL);
    };

    const closeImagePreview = () => {
        setIsImagePreviewOpen(false);
        setPreviewImage(undefined);
    };

    const handleImageDownload = async () => {
        if (!tableRef.current) return;

        const canvas = await html2canvas(tableRef.current, {
            scale: 2,
        });

        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = createImageFilename();
        link.click();
    };

    const createImageFilename = (): string => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const date = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();

        return `sos_players_${hours}_${minutes}_${date}_${month}_${year}.png`;
    };

    return (
        <div>
            <hr className="my-6"/>

            <div className="flex justify-between items-center">
                <div>
                    TODO: Filters
                </div>

                <div className="flex gap-4">
                    <SecondaryButton onClick={showImagePreview}>
                        Image Preview
                    </SecondaryButton>

                    <PrimaryButton onClick={handleImageDownload}>
                        Download Image
                    </PrimaryButton>
                </div>
            </div>

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

            <Modal show={isImagePreviewOpen} onClose={closeImagePreview} maxWidth="7xl">
                <div
                    style={{ maxHeight: '90vh' }}
                    className="w-full overflow-y-auto"
                >
                    {previewImage && (
                        <img
                            src={previewImage}
                            alt="Players Image"
                            className="w-full object-cover"
                        />
                    )}

                    <button
                        type="button"
                        className="absolute top-2 right-3 text-lg font-bold text-slate-600 hover:text-slate-800"
                        onClick={closeImagePreview}
                    >
                        &#x2715;
                    </button>
                </div>
            </Modal>
        </div>
    );
}
