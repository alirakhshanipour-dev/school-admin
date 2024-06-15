import { Router } from "express";
import { StudentRouter } from "./student.routes.js";

const router = Router()
router.use("/student", StudentRouter)

export { router as MainRouter }