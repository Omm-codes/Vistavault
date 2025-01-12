// src/app/Explore/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageModal from "../components/ImageModal";
import { getImages } from "../../lib/getImages";
import { fetchLoginStatus } from "../../lib/auth";

export default function Explore() {
    const [images, setImages] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    const headingAnimation = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            {/* Animated heading */}
            <motion.h1
                className="text-3xl font-bold mb-6"
                initial="hidden"
                animate="visible"
                variants={headingAnimation}
            >
                Explore Recently Uploaded Photos
            </motion.h1>

            {/* Masonry Grid Animation */}
            <InfiniteScroll
                dataLength={images.length}
                next={fetchMoreImages}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p className="text-center mt-4">No more images to display.</p>}
            >
                <Masonry
                    breakpointCols={{
                        default: 4,
                        1100: 3,
                        700: 2,
                        500: 1,
                    }}
                    className="flex -ml-4 w-auto"
                    columnClassName="pl-4 bg-clip-padding"
                >
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            className="relative cursor-pointer transition-transform transform hover:scale-105 mb-4"
                            onClick={() => setSelectedImage(image)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <img
                                src={image}
                                alt={`Image ${index + 1}`}
                                className="w-full h-auto object-cover rounded-lg shadow-lg"
                            />
                        </motion.div>
                    ))}
                </Masonry>
            </InfiniteScroll>

            {selectedImage && (
                <ImageModal
                    src={selectedImage}
                    alt="Selected Image"
                    onClose={() => setSelectedImage(null)}
                    isLoggedIn={isLoggedIn}
                />
            )}
        </div>
    );
}
