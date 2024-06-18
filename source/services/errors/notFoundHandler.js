export const notFoundHandler = (app) => {
    app.use((req, res, next) => {
        const status = 404
        const message = "مسیر مورد نظر پیدا نشد"
        res.status(status).json({
            status,
            message
        })
        next()
    })
}
