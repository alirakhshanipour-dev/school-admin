import e from "express"
import morgan from "morgan"
import { config } from "dotenv"
import { swaggerConfig } from "./source/configs/swagger.conf.js"
import { sequelize, sequelizeConfig } from "./source/configs/database/postgres.conf.js"
import { notFoundHandler } from "./source/services/errors/notFoundHandler.js"
import { allExeptionHandler } from "./source/services/errors/allExeption.js"
import { MainRouter } from "./source/routes/main.routes.js"
config()

const mainApp = () => {
    const app = e()
    app.use(morgan("dev"))
    app.use(e.json())
    app.use(e.urlencoded({ extended: true }))
    app.use("/", MainRouter)

    swaggerConfig(app)
    sequelizeConfig(sequelize)
    notFoundHandler(app)
    allExeptionHandler(app)

    const port = process.env.PORT || 3000
    app.listen(port, () => {
        console.log(`server is runnig on http://127.0.0.1:${port}`);
    })
}

mainApp()