import express from "express";
import { addQuestion, editCourse, getAllCourses, getCourseByUser, getSingleCourse, uploadCourse } from "../controllers/course.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
const courseRouter = express.Router();

courseRouter.post("/create-course", isAuthenticated, authorizeRoles("admin"), uploadCourse);
courseRouter.post("/update-course:id", isAuthenticated, authorizeRoles("admin"), editCourse);
courseRouter.post("/get-course:id",getSingleCourse);
courseRouter.post("/get-courses",getAllCourses);
courseRouter.post("/get-course-content/:id",isAuthenticated,getCourseByUser);
courseRouter.put("/add-question",isAuthenticated,addQuestion);

export default courseRouter;