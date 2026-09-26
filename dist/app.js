import express from "express";
import urlRoutes from "./routes/url.routes.js";
import redirectRoutes from "./routes/redirect.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
const app = express();
app.use(express.json());
app.get('/health', (_req, res) => {
    res.status(200).json({
        status: "ok"
    });
});
app.use("/api/urls", urlRoutes);
app.use("/", redirectRoutes);
app.use(errorMiddleware);
export default app;
//# sourceMappingURL=app.js.map