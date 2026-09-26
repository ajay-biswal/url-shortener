import { Router } from "express";
import { redirectUrl } from "../controller/url.controller.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
const router = Router();
router.get("/:shortCode", asyncHandler(redirectUrl));
export default router;
//# sourceMappingURL=redirect.routes.js.map