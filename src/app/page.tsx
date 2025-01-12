// src/app/page.tsx
import Link from "next/link"; // Add this import
import Gallery from "./components/Gallery";
import CategorySection from "./components/CategorySection";

export default function Home() {
  const categories = [
    { name: "Nature", slug: "nature" },
    { name: "Classic", slug: "classic" },
    { name: "Sports", slug: "sports" },
    { name: "Social", slug: "social" },
    { name: "Food", slug: "food" }, // Add more categories as needed
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-6">Welcome to Vistavault</h1>
      
      {/* Category Section */}
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-4">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link key={category.slug} href={`/categories/${category.slug}`}>
              <button className="category-button p-4 bg-gray-200 rounded-lg hover:bg-gray-300">
                {category.name}
              </button>
            </Link>
          ))}
        </div>
      </div>

      {/* Gallery Section */}
      <Gallery />
    </div>
  );
}
