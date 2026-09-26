import { prisma } from "../lib/prisma.js";
export const findByOriginalUrl = async (originalUrl) => {
    return prisma.url.findUnique({
        where: {
            originalUrl,
        },
    });
};
export const createUrl = async (originalUrl, shortCode, expiresAt) => {
    return prisma.url.create({
        data: {
            originalUrl,
            shortCode,
            expiresAt
        },
    });
};
export const findShortCode = async (shortCode) => {
    return prisma.url.findUnique({
        where: {
            shortCode,
        }
    });
};
export const incrementUrlClick = async (id) => {
    return prisma.url.update({
        where: {
            id,
        },
        data: {
            clicks: {
                increment: 1
            },
            lastAccessedAt: new Date(),
        },
    });
};
/**
 *
 * "Why did you use Prisma's increment?"

Answer:
"Because multiple requests can hit the same short URL concurrently. Reading the current click count in application code and then writing clicks + 1 can cause lost updates. Prisma's atomic increment translates this into a database-side increment, so concurrent requests don't overwrite each other's counts."
 */ 
//# sourceMappingURL=url.repository.js.map