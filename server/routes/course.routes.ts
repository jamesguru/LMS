import express from "express";
import { editCourse, getSingleCourse, uploadCourse } from "../controllers/course.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
const courseRouter = express.Router();


courseRouter.post("/create-course", isAuthenticated, authorizeRoles("admin"), uploadCourse);
courseRouter.post("/update-course:id", isAuthenticated, authorizeRoles("admin"), editCourse);
courseRouter.post("/get-course:id",getSingleCourse);
export default courseRouter;