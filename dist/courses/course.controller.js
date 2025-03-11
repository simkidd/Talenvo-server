"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const express_1 = require("express");
const express_utils_1 = require("../utils/express.utils");
const course_service_1 = require("./course.service");
const auth_middleware_1 = require("../auth/auth.middleware");
class CourseController {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    loadRoutes() {
        const courseService = new course_service_1.CourseService();
        this.router.get("/all", async (_, res) => {
            try {
                const courses = await courseService.getCourses();
                res.json(courses);
            }
            catch (error) {
                (0, express_utils_1.handleError)(error, res);
            }
        });
        this.router.post("/create", auth_middleware_1.authGuard, async (req, res) => {
            try {
                const course = await courseService.createCourse(req.body);
                res.json(course);
            }
            catch (error) {
                (0, express_utils_1.handleError)(error, res);
            }
        });
        this.router.get("/user-courses/:userId", async (req, res) => {
            try {
                const courses = await courseService.getCoursesByUser(req.params.userId);
                res.json(courses);
            }
            catch (error) {
                (0, express_utils_1.handleError)(error, res);
            }
        });
        this.router.put("/update", auth_middleware_1.authGuard, async (req, res) => {
            try {
                const course = await courseService.updateCourse(req.body);
                res.json(course);
            }
            catch (error) {
                (0, express_utils_1.handleError)(error, res);
            }
        });
        this.router.delete("/delete/:id", auth_middleware_1.authGuard, async (req, res) => {
            try {
                const course = await courseService.deleteCourse(req.params.id);
                res.json(course);
            }
            catch (error) {
                (0, express_utils_1.handleError)(error, res);
            }
        });
        this.router.get("/course/:id", auth_middleware_1.authGuard, async (req, res) => {
            try {
                const course = await courseService.getCourseById(req.params.id);
                res.json(course);
            }
            catch (error) {
                (0, express_utils_1.handleError)(error, res);
            }
        });
        return this.router;
    }
}
exports.CourseController = CourseController;
