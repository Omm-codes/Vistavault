import Link from "next/link";

const categories = [
    { name: 'Nature', slug: 'nature', imageUrl: '/path/to/nature-image.jpg' },
    { name: 'Classic', slug: 'classic', imageUrl: '/path/to/classic-image.jpg' },
    { name: 'Sports', slug: 'sports', imageUrl: '/path/to/sports-image.jpg' },
    { name: 'Social', slug: 'social', imageUrl: '/path/to/social-image.jpg' },
];

export default function CategorySection() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
            {categories.map((category) => (
                <Link key={category.slug} href={`/categories/${category.slug}`}>
                    <div className="relative group h-80 overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105">
                        <img 
                            src={category.imageUrl} 
                            alt={`${category.name} category`} 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-black opacity-40 transition-opacity duration-300 ease-in-out group-hover:opacity-60"></div>
                        <span className="relative z-10 flex items-center justify-center h-full text-4xl font-bold text-white">{category.name}</span>
                    </div>
                </Link>
            ))}
        </div>
    );
}
