import { StatusCodes } from "http-status-codes";

export const allExeptionHandler = (app) => {
    app.use((err, req, res, next) => {
        const status = err.status || err.statusCode || 500
        const message = err.msg || err.message || err.type || "خظای سرور"

        res.status(status).json({
            status,
            message
        })
        next()
    })
}