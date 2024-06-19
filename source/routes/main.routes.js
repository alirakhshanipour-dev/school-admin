import { Router } from "express";
import { StudentRouter } from "./student.routes.js";
import { TeacherRouter } from "./teacher.routes.js";
import { AuthRouter } from "./auth.routes.js";
import { UserRouter } from "./user.routes.js";
import { authenticateJWT, authorizeRoles } from "../middlewares/authenticateUser.js";

const router = Router()
router.use("/auth", AuthRouter)
router.use("/student", authenticateJWT, authorizeRoles("admin"), StudentRouter)
router.use("/teacher", authenticateJWT, authorizeRoles("admin"), TeacherRouter)
router.use("/user", authenticateJWT, authorizeRoles("admin"), UserRouter)

export { router as MainRouter }