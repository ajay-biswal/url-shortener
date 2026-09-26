import { AppError } from "../errors/AppError.js";
// export const errorMiddleware = (
//     err: Error,
//     req: Request,
//     res: Response,
//     next: NextFunction
// )=>{
//     if(err instanceof AppError){
//         return res.status(err.statusCode).json({
//             message: err.message,
//         });
//     }
//     console.error(err);
//     return res.status(500).json({
//         message: "Internal server error"
//     });
// }
export const errorMiddleware = (err, req, res, next) => {
    if (err instanceof AppError) {
        const response = {
            message: err.message,
        };
        if (err.details) {
            response.errors = err.details;
        }
        return res.status(err.statusCode).json(response);
    }
    console.error(err);
    return res.status(500).json({
        message: "Internal Server Error",
    });
};
//# sourceMappingURL=error.middleware.js.map