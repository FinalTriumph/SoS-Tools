import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import { useState, RefObject } from 'react';
import { toPng } from 'html-to-image';

export default function ImageOptions({
    tableRef,
} : {
    tableRef: RefObject<HTMLTableElement>;
}) {
    const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);

    const generateImage = async (): Promise<string | null> => {
        if (!tableRef.current) return null;

        const scale = 2;
        const options = {
            width: tableRef.current.offsetWidth * scale,
            height: tableRef.current.offsetHeight * scale,
            style: {
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                width: `${tableRef.current.offsetWidth}px`,
                height: `${tableRef.current.offsetHeight}px`,
            },
        };

        try {
            const dataURL = await toPng(tableRef.current, options);
            return dataURL;
        } catch (error) {
            console.error('Failed to generate image:', error);
            return null;
        }
    };

    const showImagePreview = async () => {
        setIsImagePreviewOpen(true);
        const dataURL = await generateImage();
        if (dataURL) {
            setPreviewImage(dataURL);
        } else {
            console.log('No image generated for preview.');
        }
    };

    const closeImagePreview = () => {
        setIsImagePreviewOpen(false);
        setPreviewImage(undefined);
    };

    const handleImageDownload = async () => {
        const dataURL = await generateImage();
        if (!dataURL) return;

        const link = document.createElement('a');
        link.href = dataURL;
        link.download = createImageFilename();
        link.click();
    };

    const createImageFilename = (): string => {
        const now = new Date();
        return `sos_players_${now.toISOString().replace(/[:.-]/g, '').slice(0, -3)}.png`;
    }

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
                            className="w-full object-contain"
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
