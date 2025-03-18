import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import { useState, RefObject } from 'react';
import html2canvas from 'html2canvas';

export default function ImageOptions({
    tableRef,
} : {
    tableRef: RefObject<HTMLTableElement>;
}) {
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
            <div className="flex gap-2">
                <SecondaryButton onClick={showImagePreview}>
                    Image Preview
                </SecondaryButton>

                <PrimaryButton onClick={handleImageDownload}>
                    Download Image
                </PrimaryButton>
            </div>

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
};
