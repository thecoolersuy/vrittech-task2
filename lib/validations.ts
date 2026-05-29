import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must not exceed 200 characters"),
  body: z
    .string()
    .min(1, "Body is required")
    .min(10, "Body must be at least 10 characters")
    .max(1000, "Body must not exceed 1000 characters"),
});

export type CreatePostFormData = z.infer<typeof createPostSchema>;
