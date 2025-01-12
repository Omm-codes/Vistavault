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
      const response = await fetch(imageSrc, { mode: "cors" });
      if (!response.ok) throw new Error("Image download failed");

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `image-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
      onClick={onClose}
    >
      <div
        className="relative p-4 bg-white rounded-lg shadow-lg max-w-[90%] max-h-[90%] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Container */}
        <div className="flex-1 flex items-center justify-center max-w-full max-h-full">
          <Image
            src={src}
            alt={alt}
            layout="responsive"
            width={800}
            height={600}
            className="rounded-md border border-gray-300 object-contain max-w-full max-h-[80vh]"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-4 w-full">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
            onClick={onClose}
          >
            Close
          </button>

          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
            onClick={() => handleDownload(src)}
          >
            Download
          </button>

          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          >
            View
          </a>

          <button
            className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-600 transition"
            onClick={() => {
              if (navigator.share) {
                navigator
                  .share({
                    title: "Check out this image!",
                    url: src,
                  })
                  .catch((error) => console.error("Sharing failed:", error));
              } else {
                alert("Sharing not supported on this device.");
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
