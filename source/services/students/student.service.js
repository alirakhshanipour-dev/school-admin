import autoBind from "auto-bind"
import { Student } from "../../models/student.model.js"

export const StudentService = (() => {

    class StudentService {
        #model
        constructor() {
            autoBind(this)
            this.#model = Student
        }

        async signupStudent(req, res, next) {
            try {
                const studentData = req.body
            } catch (error) {
                next(error)
            }
        }
    }

    return new StudentService()
})()