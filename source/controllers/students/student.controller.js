import { Student } from "../../models/student.model.js"
import { StatusCodes as STATUS } from "http-status-codes"
import { StudentMsg } from "./student.msg.js"
import autoBind from "auto-bind"


export const StudentController = (() => {
    class StudentController {
        #model
        constructor() {
            autoBind(this)
            this.#model = Student
        }

        // create student
        async create(req, res, next) {
            try {
                const studentData = req.body

                res.status(STATUS.CREATED).json({
                    success: true,
                    message: StudentMsg.OK,
                    studentData
                })
            } catch (error) {
                next(error)
            }
        }

        // get students endpoint
        async getStudents(req, res, next) {
            try {
                const students = await this.#model.findAll({})

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

    }

    return new StudentController()
})()

