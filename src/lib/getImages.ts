import { ImageData } from './types'; // Import a type if you're using TypeScript

export const getImages = async (): Promise<string[]> => {
  const response = await fetch('https://api.pexels.com/v1/curated', {
    headers: {
      Authorization: 'IFXiU3fTs6JvCpGae3m8AvjHuKi4WVNk5ZgCmjqRK0sVTRbRhcmYpt6Z', // Replace with your actual API key
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch images');
  }

  const data = await response.json();
  return data.photos.map((photo: ImageData) => photo.src.medium); // Adjust based on API response structure
};
