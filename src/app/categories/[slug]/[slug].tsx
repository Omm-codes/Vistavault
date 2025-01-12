import React from 'react';
import { useRouter } from "next/router";
import fetchImages from "@/lib/fetchImages"; // Adjust this import path
import { ImagesResults } from "@/models/Images"; // Adjust this import path
import Image from "next/image";

export default function CategoryPage() {
    const router = useRouter();
    const { slug } = router.query;

    const [images, setImages] = React.useState<ImagesResults | undefined>(undefined);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchCategoryImages = async () => {
            if (slug) {
                const url = `https://api.pexels.com/v1/search?query=${slug}`;
                const result = await fetchImages(url);
                setImages(result);
            }
            setLoading(false);
        };

        fetchCategoryImages();
    }, [slug]);

    if (loading) return <p>Loading...</p>;
    if (!images || images.photos.length === 0) return <h2>No images found for this category.</h2>;

    return (
        <div>
            <h1 className="text-3xl font-bold">{slug} Images</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.photos.map((photo) => (
                    <div key={photo.id} className="relative">
                        <Image 
                            src={photo.src.large} 
                            alt={photo.alt} 
                            width={400} 
                            height={300} 
                            className="rounded-lg" 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
