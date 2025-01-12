// src/app/categories/[slug]/page.tsx
import Gallery from '../../components/Gallery';

type Props = {
    params: { slug: string }; // Define the expected params type
};

export default function CategoryPage({ params }: Props) {
    const { slug } = params; // Extract slug from params

    return (
        <div>
            <h1 className="text-3xl font-bold">{slug} Images</h1>
            <Gallery topic={slug} />
        </div>
    );
}
