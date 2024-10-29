import { z } from 'zod';

// Basic schema for image results
const BasicImageSchema = z.object({
    page: z.number(),
    per_page: z.number(),
    prev_page: z.string().optional(),
    next_page: z.string().optional(),
    total_results: z.number(),
});

// Schema for each photo
const PhotoSchema = z.object({
    id: z.number(),
    width: z.number(),
    height: z.number(),
    url: z.string(),
    src: z.object({
        large: z.string(),
    }),
    alt: z.string(),
    blurredDataUrl: z.string().optional(),
});

// Extending the basic schema to include an array of photos
export const ImagesSchemaWithPhotos = BasicImageSchema.extend({
    photos: z.array(PhotoSchema),
});

// Exporting inferred types for use elsewhere
export type Photo = z.infer<typeof PhotoSchema>;
export type ImagesResults = z.infer<typeof ImagesSchemaWithPhotos>;
