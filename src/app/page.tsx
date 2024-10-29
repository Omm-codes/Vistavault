import Link from "next/link";
import Gallery from "./components/Gallery";

export default function Home() {
  const categories = [
    { name: "Nature", slug: "nature", imageUrl: "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
    { name: "Classic", slug: "classic", imageUrl: "https://images.pexels.com/photos/1010519/pexels-photo-1010519.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
    { name: "Sports", slug: "sports", imageUrl: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
    { name: "Social", slug: "social", imageUrl: "https://images.pexels.com/photos/1036804/pexels-photo-1036804.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
    { name: "Food", slug: "food", imageUrl: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
    { name: "Technology", slug: "technology", imageUrl: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
    { name: "Culture", slug: "culture", imageUrl: "https://images.pexels.com/photos/667200/pexels-photo-667200.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
    { name: "Fashion", slug: "fashion", imageUrl: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500">
      <h1 className="text-4xl font-bold text-center mb-6">Welcome to Vistavault</h1>

      {/* Category Section */}
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-4">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12">
          {categories.map((category) => (
            <Link key={category.slug} href={`/categories/${category.slug}`}>
              <div
                className="relative group h-64 overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
                style={{
                  backgroundImage: `url(${category.imageUrl})`, // Fixed: Added backticks for template literal
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300 ease-in-out group-hover:opacity-70"></div>
                <span className="relative z-10 flex items-center justify-center h-full text-3xl font-bold text-white">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Gallery Section */}
      <Gallery />
    </div>
  );
}
