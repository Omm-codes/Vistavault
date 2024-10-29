import Link from "next/link";

const categories = [
    { name: 'Nature', slug: 'nature', imageUrl: 'https://source.unsplash.com/featured/?nature' },
    { name: 'Classic', slug: 'classic', imageUrl: 'https://source.unsplash.com/featured/?classic' },
    { name: 'Sports', slug: 'sports', imageUrl: 'https://source.unsplash.com/featured/?sports' },
    { name: 'Social', slug: 'social', imageUrl: 'https://source.unsplash.com/featured/?social' },
    { name: 'Technology', slug: 'technology', imageUrl: 'https://source.unsplash.com/featured/?technology' }, 
    { name: 'Culture', slug: 'culture', imageUrl: 'https://source.unsplash.com/featured/?culture' },          
    { name: 'Fashion', slug: 'fashion', imageUrl: 'https://source.unsplash.com/featured/?fashion' },
];

export default function CategorySection() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12">
            {categories.map((category) => (
                <Link key={category.slug} href={`/categories/${category.slug}`}>
                    <div 
                        className="relative group h-96 overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
                        style={{
                            backgroundImage: `url(${category.imageUrl})`, // Dynamically set background image
                            backgroundSize: 'cover',                      // Ensure the image covers the button area
                            backgroundPosition: 'center',                 // Center the background image
                        }}
                    >
                        {/* Dark overlay for readability */}
                        <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300 ease-in-out group-hover:opacity-70"></div>

                        {/* Category name in the center */}
                        <span className="relative z-10 flex items-center justify-center h-full text-4xl font-bold text-white">
                            {category.name}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
}
