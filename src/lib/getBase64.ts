import { getPlaiceholder } from "plaiceholder";
import type { Photo, ImagesResults } from "@/models/Images";

async function getBase64(imageUrl: string) {
  try {
    const res = await fetch(imageUrl);

    if (!res.ok) {
      throw new Error(`Failed to fetch images: ${res.status} ${res.statusText}`);
    }

    const buffer = await res.arrayBuffer();
    const { base64 } = await getPlaiceholder(Buffer.from(buffer));
    return base64;
  } catch (e) {
    if (e instanceof Error) console.error(e);
  }
}

export default async function addBlurredDataUrls(images: ImagesResults): Promise<Photo[]> {
  const base64Promises = images.photos.map(photo => getBase64(photo.src.large)); // Fetch all at once
  const base64Results = await Promise.all(base64Promises);

  return images.photos.map((photo, i) => {
    photo.blurredDataUrl = base64Results[i];
    return photo;
  });
}
