import { StatusCodes as STATUS } from "http-status-codes"
import { models } from "../../configs/database/postgres.conf.js"
import autoBind from "auto-bind"


export const UserService = (() => {
    class UserService {
        #model
        constructor() {
            autoBind(this)
            this.#model = models.User
        }

        async register(req, res, next) {
            try {
                const { username, phone, email, password } = req.body;
                const user = await this.#model.create({ username, phone, email, password });
                res.status(STATUS.OK).json({ message: 'User registered successfully' });
            } catch (error) {
                next(error)
            }
        }

        async login(req, res, next) {
            try {
                const { username, password } = req.body;
                const user = await this.#model.findOne({ where: { username } });

                if (!user || !user.validatePassword(password)) {
                    return res.status(STATUS.UNAUTHORIZED).json({ message: 'Invalid username or password' });
                }

                const token = user.generateJWT();

                res.status(200).json({ token });
            } catch (error) {
                next(error)
            }
        }
    }
    return new UserService()
})()