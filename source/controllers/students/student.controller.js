import { Student } from "../../models/student.model.js"

export const StudentController = (() => {
    class StudentController {
        #model
        constructor() {
            this.#model = Student
        }

        async create(req, res, next) {
            try {
                const studentData = req.body

                res.status().json({
                    success: true,
                    message: ""
                })
            } catch (error) {
                next(error)
            }
        }

    }

    return new StudentController()
})()
