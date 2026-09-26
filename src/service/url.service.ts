import {
  findByOriginalUrl,
  createUrl,
  findShortCode,
  incrementUrlClick,
} from "../repositories/url.repository.js";

import { nanoid } from "nanoid";
import { Prisma } from "../generated/prisma/client.js";

export const createShortUrl = async (
  originalUrl: string,
  expiresIn?: number,
) => {
  const existingUrl = await findByOriginalUrl(originalUrl);

  if (existingUrl) {
    return existingUrl;
  }

  for (let attempt = 0; attempt < 5; attempt++) {
    const shortCode = nanoid(7);

    const expiresAt = expiresIn
      ? new Date(Date.now() + expiresIn * 1000)
      : null;

    try {
      return await createUrl(
        originalUrl,
        shortCode,
        expiresAt,
      );
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        const existingUrl = await findByOriginalUrl(originalUrl);

        if (existingUrl) {
          return existingUrl;
        }

        // Short-code collision → generate another code
        continue;
      }

      throw error;
    }
  }

  throw new Error("Failed to generate unique short url");
};

export const getUrlByShortCode = async (shortCode: string) => {
  return findShortCode(shortCode);
};

export const recordUrlClick = async (id: string) => {
  return incrementUrlClick(id);
};