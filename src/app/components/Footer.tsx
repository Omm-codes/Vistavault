import Link from "next/link";

type Props = {
    topic: string,
    page: string | undefined,
    prevPage: string | null,
    nextPage: string | null,
}

export default function Footer({ topic, page, prevPage, nextPage }: Props) {
    if (!prevPage && !nextPage) return null; // Return nothing if there's no pagination

    const pageNums: number[] = [];
    if (prevPage && nextPage) {
        for (let i = parseInt(prevPage) + 1; i < parseInt(nextPage); i++) {
            pageNums.push(i);
        }
    }

    // Link for next page
    const nextPageArea = nextPage ? (
        <Link href={`/results/${topic}/${nextPage}`} className={!prevPage ? "mx-auto" : ""}>
            {!prevPage ? "More" : ""} &gt;&gt;&gt;
        </Link>
    ) : null;

    // Link for previous page
    const prevPageArea = prevPage ? (
        <>
            <Link href={`/results/${topic}/${prevPage}`} className={!nextPage ? "mx-auto" : ""}>
                &lt;&lt;&lt; {!nextPage ? "Back" : ""}
            </Link>

            {/* Display page numbers between prev and next */}
            {pageNums.map(num => (
                page && num === parseInt(page) ? (
                    <span key={num} className="font-bold">{num}</span> // Highlight current page
                ) : (
                    <Link key={num} href={`/results/${topic}/${num}`} className="underline">
                        {num}
                    </Link>
                )
            ))}
        </>
    ) : null;

    return (
        <footer className="flex flex-row justify-between items-center px-2 py-4 font-bold w-60 mx-auto">
            {prevPageArea}
            {nextPageArea}
        </footer>
    );
}
