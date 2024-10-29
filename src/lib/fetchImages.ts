import type { ImagesResults } from "@/models/Images"; // Ensure this path is correct
import { ImagesSchemaWithPhotos } from "@/models/Images"; // Ensure this path is correct

import env from "./env";

export default async function fetchImages(url: string): Promise<ImagesResults | undefined> {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: env.PEXELS_API_KEY,
      },
    });

    if (!res.ok) throw new Error("Fetch Images error!");

    const imagesResults: ImagesResults = await res.json();
    console.log(imagesResults);

    // Parse data with zod schema
    const parsedData = ImagesSchemaWithPhotos.parse(imagesResults);

    if (parsedData.total_results === 0) return undefined;

    return parsedData;
  } catch (e) {
    // Show error in terminal console
    if (e instanceof Error) console.error(e);
  }
}
