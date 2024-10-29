import type { ImagesResults } from "@/models/Images";

function getPageNumber(url: string): number | null {
    const { searchParams } = new URL(url);
    const page = searchParams.get('page');
    return page ? parseInt(page) : null; // Return null if not found
}

export default function getPrevNextPages(images: ImagesResults) {
    const totalPages = Math.ceil(images.total_results / images.per_page);

    const prevPage = images.prev_page ? getPageNumber(images.prev_page) : null;
    let nextPage = images.next_page ? getPageNumber(images.next_page) : null;

    // Adjust next page based on the previous page
    if (prevPage !== null && (prevPage + 5) < totalPages) {
        nextPage = (prevPage + 5).toString();
    }

    // Ensure nextPage is within the total pages
    if (nextPage && parseInt(nextPage) >= totalPages) {
        nextPage = null;
    }

    return { prevPage, nextPage };
}
