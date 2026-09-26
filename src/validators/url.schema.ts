import { z } from "zod";

export const createUrlSchema = z.object({
    url: z.url(),
    expiresIn: z.number().int().positive().optional(),
});