import { Router } from "express";
import { handleError } from "../utils/express.utils";
import { CourseService } from "./course.service";
import { authGuard } from "../auth/auth.middleware";

export class CourseController {
  router = Router();

  loadRoutes() {
    const courseService = new CourseService();
    this.router.get("/all", async (_, res) => {
      try {
        const courses = await courseService.getCourses();
        res.json(courses);
      } catch (error) {
        handleError(error, res);
      }
    });

    this.router.post("/create", authGuard, async (req, res) => {
      try {
        const course = await courseService.createCourse(req.body);
        res.json(course);
      } catch (error) {
        handleError(error, res);
      }
    });

    this.router.get("/user-courses/:userId", async (req, res) => {
      try {
        const courses = await courseService.getCoursesByUser(req.params.userId);
        res.json(courses);
      } catch (error) {
        handleError(error, res);
      }
    });

    this.router.put("/update", authGuard, async (req, res) => {
      try {
        const course = await courseService.updateCourse(req.body);
        res.json(course);
      } catch (error) {
        handleError(error, res);
      }
    });

    this.router.delete("/delete/:id", authGuard, async (req, res) => {
      try {
        const course = await courseService.deleteCourse(req.params.id);
        res.json(course);
      } catch (error) {
        handleError(error, res);
      }
    });
    this.router.get("/course/:id", authGuard, async (req, res) => {
      try {
        const course = await courseService.getCourseById(req.params.id);
        res.json(course);
      } catch (error) {
        handleError(error, res);
      }
    });

    return this.router;
  }
}
