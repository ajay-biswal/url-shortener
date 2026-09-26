import { Router } from "express";
import { createUrl } from "../controller/url.controller.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
const router = Router();
router.post('/', asyncHandler(createUrl));
export default router;
//# sourceMappingURL=url.routes.js.map