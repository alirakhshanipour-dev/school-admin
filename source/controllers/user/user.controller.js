import autoBind from "auto-bind"
import { models } from "../../configs/database/postgres.conf.js"
import { StatusCodes as STATUS } from "http-status-codes"
import { UserMsg } from "./user.msg.js"

export const UserController = (() => {
    class UserController {
        #model
        constructor() {
            autoBind(this)
            this.#model = models.User
        }

        async create(req, res, next) { }

        async getUser(req, res, next) {
            try {
                const { id: studentId } = req.params
                const user = await this.#model.findUser(studentId)

                res.status(STATUS.OK).json({
                    success: true,
                    message: UserMsg.USER_OK,
                    user
                })
            } catch (error) {
                next(error)
            }
        }

        async getUsers(req, res, next) {
            try {
                const users = await this.#model.findUsersWithFilter(req.query)

                res.status(STATUS.OK).json({
                    success: true,
                    message: UserMsg.USERS_OK,
                    users
                })
            } catch (error) {
                next(error)
            }
        }
    }

    return new UserController()
})()