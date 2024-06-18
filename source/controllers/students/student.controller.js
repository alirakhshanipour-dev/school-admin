import { StatusCodes as STATUS } from "http-status-codes"
import { StudentMsg } from "./student.msg.js"
import autoBind from "auto-bind"
import { models } from "../../configs/database/postgres.conf.js"


export const StudentController = (() => {
    class StudentController {
        #model
        constructor() {
            autoBind(this)
            this.#model = models.Student
        }

        // create student
        async create(req, res, next) {
            try {
                const studentData = req.body
                const student = await this.#model.create(studentData)

                res.status(STATUS.CREATED).json({
                    success: true,
                    message: StudentMsg.CREATED,
                    student
                })

            } catch (error) {
                next(error)
            }
        }

        // get students endpoint
        async getStudents(req, res, next) {
            try {
                const students = await this.#model.findStudentsWithFilter(req.query)

                res.status(STATUS.OK).json({
                    success: true,
                    message: StudentMsg.STUDENT_LIST_OK,
                    students
                })

            } catch (error) {
                next(error)
            }
        }

        // get student endpoint
        async getStudent(req, res, next) {
            try {
                const { id: studentId } = req.params
                const student = await this.#model.findStudent(studentId)

                res.status(STATUS.OK).json({
                    success: true,
                    message: StudentMsg.STUDENT_OK,
                    student
                })
            } catch (error) {
                next(error)
            }
        }

        async updateStudent(req, res, next) {
            try {
                const { id: studentId } = req.params
                const updatedData = req.body

                const updatedStudent = await this.#model.updateStudent(studentId, updatedData)

                res.status(STATUS.OK).json({
                    success: true,
                    message: StudentMsg.STUDENT_UPDATED,
                    updatedStudent
                })
            } catch (error) {
                next(error)
            }
        }

        // delete student
        async deleteStudent(req, res, next) {
            try {
                const { id: studentId } = req.params
                const student = await this.#model.findStudent(studentId)
                await student.destroy()

                res.status(STATUS.ACCEPTED).json({
                    success: true,
                    message: StudentMsg.STUDENT_DELETED
                })
            } catch (error) {
                next(error)
            }
        }

        // delete all students
        async deleteAllStudents(req, res, next) {
            try {
                await this.#model.destroyAllStudents()

                res.status(STATUS.ACCEPTED).json({
                    success: true,
                    message: StudentMsg.ALL_STUDENTS_DELETED
                })
            } catch (error) {
                next(error)
            }
        }


    }

    return new StudentController()
})()

