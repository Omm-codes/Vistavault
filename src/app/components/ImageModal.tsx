



"use client";

import Image from "next/image";

type Props = {
    src: string;
    alt: string;
    onClose: () => void;
};

export default function ImageModal({ src, alt, onClose }: Props) {
    const handleDownload = async (imageSrc: string) => {
        try {
            const response = await fetch(imageSrc, { mode: 'cors' });
            if (!response.ok) throw new Error('Image download failed');

            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `image-${Date.now()}.jpg`; // Customize the filename
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    return (
        <div 
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50" 
            onClick={onClose}
        >
            <div className="relative max-w-full max-h-full p-4" onClick={(e) => e.stopPropagation()}>
                <Image
                    src={src}
                    alt={alt}
                    width={800}
                    height={800}
                    className="object-contain"
                />
                <div className="absolute top-4 right-4">
                    <button 
                        className="bg-white text-black px-4 py-2 rounded mr-2" 
                        onClick={onClose}
                    >
                        Close
                    </button>
                    
                    {/* Download button */}
                    <button 
                        onClick={() => handleDownload(src)} 
                        className="bg-white text-black px-4 py-2 rounded"
                    >
                        Download
                    </button>

                    {/* View button */}
                    <a 
                        href={src} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="ml-2 bg-white text-black px-4 py-2 rounded"
                    >
                        View
                    </a>
                </div>
            </div>
        </div>
    );
}
