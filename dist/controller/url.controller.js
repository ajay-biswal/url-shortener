import { createUrlSchema } from "../validators/url.schema.js";
import { createShortUrl, getUrlByShortCode, recordUrlClick } from "../service/url.service.js";
import { AppError } from "../errors/AppError.js";
export const createUrl = async (req, res) => {
    const result = createUrlSchema.safeParse(req.body);
    if (!result.success) {
        throw new AppError("Invalid Request", 400, result.error.issues);
    }
    const url = await createShortUrl(result.data.url, result.data.expiresIn);
    return res.status(201).json({
        shortCode: url.shortCode,
        shortUrl: `http://localhost:5000/${url.shortCode}`
    });
};
export const redirectUrl = async (req, res) => {
    const param = req.params.shortCode;
    if (!param) {
        throw new AppError("Short code is required", 400);
    }
    const shortCode = Array.isArray(param) ? param[0] : param;
    if (!shortCode) {
        throw new AppError("Short code is required", 400);
    }
    const url = await getUrlByShortCode(shortCode);
    if (!url) {
        throw new AppError("Short URL not found", 404);
    }
    await recordUrlClick(url.id);
    return res.redirect(url.originalUrl);
};
//# sourceMappingURL=url.controller.js.map