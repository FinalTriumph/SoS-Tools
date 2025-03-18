import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import { useState, RefObject } from 'react';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import domtoimagemore from 'dom-to-image-more';
import * as htmlToImage from 'html-to-image';
import rasterizeHTML from 'rasterizehtml';

type LibraryOptions = {
    library: 'html2canvas' | 'dom-to-image' | 'dom-to-image-more' | 'html-to-image' | 'rasterizehtml';
};

export default function ImageOptions({
    tableRef,
    library,
} : {
    tableRef: RefObject<HTMLTableElement>;
    library: LibraryOptions['library'];
}) {
    const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);

    const generateImage = async () => {
        if (!tableRef.current) return;

        let dataURL: string;

        switch (library) {
            case 'html2canvas':
                const html2CanvasResult = await html2canvas(tableRef.current, {
                    scale: 2,
                });
                dataURL = html2CanvasResult.toDataURL('image/png');
                break;
            case 'dom-to-image':
                const scale = 2;
                const style = {
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    width: `${tableRef.current.offsetWidth}px`,
                    height: `${tableRef.current.offsetHeight}px`,
                };

                const options = {
                    width: tableRef.current.offsetWidth * scale,
                    height: tableRef.current.offsetHeight * scale,
                    style,
                };

                dataURL = await domtoimage.toPng(tableRef.current, options);
                break;
            case 'dom-to-image-more':
                const mScale = 2;
                const mStyle = {
                    transform: `scale(${mScale})`,
                    transformOrigin: 'top left',
                    width: `${tableRef.current.offsetWidth}px`,
                    height: `${tableRef.current.offsetHeight}px`,
                };

                const mOptions = {
                    width: tableRef.current.offsetWidth * mScale,
                    height: tableRef.current.offsetHeight * mScale,
                    mStyle,
                };

                dataURL = await domtoimagemore.toPng(tableRef.current, mOptions);
                break;
            case 'html-to-image':
                const scaleH = 2;
                const optionsH = {
                    width: tableRef.current.offsetWidth * scaleH,
                    height: tableRef.current.offsetHeight * scaleH,
                    style: {
                        transform: `scale(${scaleH})`,
                        transformOrigin: 'top left',
                        width: `${tableRef.current.offsetWidth}px`,
                        height: `${tableRef.current.offsetHeight}px`,
                    },
                };

                dataURL = await htmlToImage.toPng(tableRef.current, optionsH);
                break;
            case 'rasterizehtml':
                const canvas = document.createElement('canvas');
                canvas.width = tableRef.current.offsetWidth;
                canvas.height = tableRef.current.offsetHeight;

                // Render the HTML content into the canvas
                await rasterizeHTML.drawHTML(tableRef.current.outerHTML, canvas);

                // Convert the canvas to a data URL
                dataURL = canvas.toDataURL('image/png');
                break;
            default:
                throw new Error(`Unsupported library: ${library}`);
        }

        return dataURL;
    };

    const showImagePreview = async () => {
        setIsImagePreviewOpen(true);
        const dataURL = await generateImage();
        setPreviewImage(dataURL);
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
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const date = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();

        return `sos_players_${library}_${hours}_${minutes}_${date}_${month}_${year}.png`;
    };

    return (
        <div className="border p-1 rounded-md">
            <div className="text-center p-2">{library}</div>
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
