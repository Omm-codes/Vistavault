"use client";

import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageModal from "../components/ImageModal";
import { getImages } from "../../lib/getImages"; // Ensure path is correct
import { fetchLoginStatus } from "../../lib/auth"; // Import the new auth utility
import { useRouter } from "next/navigation";

export default function Explore() {
    const [images, setImages] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkLogin = async () => {
            const status = await fetchLoginStatus();
            setIsLoggedIn(status);
        };
        checkLogin();
        fetchMoreImages(); // Load first set of images
    }, []);

    const fetchMoreImages = async () => {
        const fetchedImages = await getImages(page);
        if (fetchedImages.length === 0) {
            setHasMore(false);
        } else {
            setImages((prevImages) => [...prevImages, ...fetchedImages]);
            setPage((prevPage) => prevPage + 1);
        }
    };

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6">Explore Recently Uploaded Photos</h1>

            <InfiniteScroll
                dataLength={images.length}
                next={fetchMoreImages}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p className="text-center mt-4">No more images to display.</p>}
            >
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="flex -ml-4 w-auto"
                    columnClassName="pl-4 bg-clip-padding"
                >
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="relative cursor-pointer transition-transform transform hover:scale-105 mb-4"
                            onClick={() => setSelectedImage(image)}
                        >
                            <img
                                src={image}
                                alt={`Image ${index + 1}`} // Fixed: Added backticks for template literal
                                className="w-full h-auto object-cover rounded-lg shadow-lg"
                            />
                        </div>
                    ))}
                </Masonry>
            </InfiniteScroll>

            {selectedImage && (
                <ImageModal
                    src={selectedImage}
                    alt="Selected Image"
                    onClose={() => setSelectedImage(null)}
                    isLoggedIn={isLoggedIn} // Pass login state
                />
            )}
        </div>
    );
}
