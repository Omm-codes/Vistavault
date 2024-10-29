"use client";

import Image from "next/image";

type Props = {
    src: string;
    alt: string;
    onClose: () => void;
    isLoggedIn: boolean; // Add this line
};

export default function ImageModal({ src, alt, onClose, isLoggedIn }: Props) {
    const handleDownload = async (imageSrc: string) => {
        try {
            const response = await fetch(imageSrc, { mode: 'cors' });
            if (!response.ok) throw new Error('Image download failed');

            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `image-${Date.now()}.jpg`; // Fixed: Added backticks
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
                <div className="absolute top-4 right-4 space-x-2 flex">
                    <button
                        className="bg-gradient-to-r from-purple-400 to-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:from-purple-500 hover:to-blue-600 transition duration-300"
                        onClick={onClose}
                    >
                        Close
                    </button>

                    {/* Only show Download button if logged in */}
                   
                        <button
                            onClick={() => handleDownload(src)}
                            className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:from-green-500 hover:to-teal-600 transition duration-300"
                        >
                            Download
                        </button>
                    

                    {/* View button (always visible) */}
                    <a
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:from-yellow-500 hover:to-orange-600 transition duration-300"
                    >
                        View
                    </a>

                    {/* Share button (always visible) */}
                    <button
                        className="bg-gradient-to-r from-pink-400 to-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:from-pink-500 hover:to-red-600 transition duration-300"
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: 'Check out this image!',
                                    url: src
                                }).catch((error) => console.log('Sharing failed', error));
                            } else {
                                alert("Sharing not supported");
                            }
                        }}
                    >
                        Share
                    </button>
                </div>
            </div>
        </div>
    );
}
