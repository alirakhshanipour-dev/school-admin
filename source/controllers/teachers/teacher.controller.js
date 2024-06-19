import { StatusCodes as STATUS } from "http-status-codes"
import { models } from "../../configs/database/postgres.conf.js"
import { TeacherMsg } from "./teacher.msg.js"
import autoBind from "auto-bind"

export const TeacherController = (() => {
    class TeacherController {
        #model
        constructor() {
            autoBind(this)
            this.#model = models.Teacher
        }

        async create(req, res, next) {
            try {
                const data = req.body
                const teacher = await this.#model.create(data)

                res.status(STATUS.CREATED).json({
                    success: true,
                    message: TeacherMsg.CREATED,
                    teacher
                })
            } catch (error) {
                next(error)
            }
        }

        async getTeacher(req, res, next) {
            try {
                const { id: teacherId } = req.params
                const teacher = await this.#model.findTeacher(teacherId)

                res.status(STATUS.OK).json({
                    success: true,
                    message: TeacherMsg.TEACHER_OK,
                    teacher
                })
            } catch (error) {
                next(error)
            }
        }

        async getTeachers(req, res, next) {
            try {
                const teachers = await this.#model.findTeachersWithFilter(req.query)

                res.status(STATUS.OK).json({
                    success: true,
                    message: TeacherMsg.TEACHERS_LIST,
                    teachers
                })
            } catch (error) {
                next(error)
            }
        }
    }

    return new TeacherController()
})()