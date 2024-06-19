import e from "express"
import morgan from "morgan"
import { config } from "dotenv"
import { swaggerConfig } from "./source/configs/swagger.conf.js"
import { sequelize, sequelizeConfig } from "./source/configs/database/postgres.conf.js"
import { notFoundHandler } from "./source/services/errors/notFoundHandler.js"
import { allExeptionHandler } from "./source/services/errors/allExeption.js"
import { MainRouter } from "./source/routes/main.routes.js"
import cors from 'cors';
import { sequelizeErrorHandler } from "./source/services/errors/sequelizeError.js"
import session from "express-session"
import passport from "passport"
import { passportConfig } from "./source/configs/auth/passport.conf.js"
config()

const mainApp = () => {
    const app = e()
    app.use(cors());
    app.use(morgan("dev"))
    app.use(e.static("public"))
    app.use(e.json())
    app.use(e.urlencoded({ extended: true }))
    app.use("/", MainRouter)

    app.use(session({
        secret: 'your_session_secret',
        resave: false,
        saveUninitialized: true,
    }));

    app.use(passport.initialize());
    app.use(passport.session());


    swaggerConfig(app)
    sequelizeConfig(sequelize)

    passportConfig(passport)
    // Error Handlers
    allExeptionHandler(app)
    sequelizeErrorHandler(app)
    notFoundHandler(app)

    const port = process.env.PORT || 3000
    app.listen(port, () => {
        console.log(`server is runnig on http://127.0.0.1:${port}`);
    })
}

mainApp()