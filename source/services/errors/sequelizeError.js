import { StatusCodes } from "http-status-codes";

export const sequelizeErrorHandler = (app) => {
    app.use((err, req, res, next) => {
        if (err.name === 'SequelizeValidationError') {
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "ورودی نامعتبر",
                errors: err.errors.map(e => e.message)
            });
        }
        next()
    })
}