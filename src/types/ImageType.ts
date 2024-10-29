export interface ImageType {
    id: string;                // Unique identifier for the image
    url: string;               // Direct URL to the image
    title: string;             // Title of the image
    uploader: string;          // Name of the uploader
    tags: string[];            // Tags associated with the image
    likes: number;             // Number of likes the image has received
}
