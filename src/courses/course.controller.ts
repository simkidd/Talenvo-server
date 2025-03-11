import { Router } from "express";
import { handleError } from "../utils/express.utils";
import { CourseService } from "./course.service";
import { authGuard } from "../auth/auth.middleware";

export class CourseController {
  router = Router();

  loadRoutes() {
    const courseService = new CourseService();

    /**
     * @swagger
     * /courses/all:
     *   get:
     *     summary: Get all courses
     *     description: Fetch a list of all available courses.
     *     tags:
     *       - Courses
     *     responses:
     *       200:
     *         description: A list of courses.
     *       500:
     *         description: Internal server error
     */
    this.router.get("/all", async (_, res) => {
      try {
        const courses = await courseService.getCourses();
        res.json(courses);
      } catch (error) {
        handleError(error, res);
      }
    });

    /**
     * @swagger
     * /courses/create:
     *   post:
     *     summary: Create a new course
     *     description: Allows an authenticated user to create a course.
     *     tags:
     *       - Courses
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *                 example: "Introduction to JavaScript"
     *               description:
     *                 type: string
     *                 example: "A beginner-friendly course on JavaScript."
     *               image:
     *                 type: string
     *                 example: "https://example.com/course-image.jpg"
     *               subject:
     *                 type: string
     *                 example: "Programming"
     *               course:
     *                 type: string
     *                 example: "JavaScript Basics"
     *               resourceUrl:
     *                 type: string
     *                 format: uri
     *                 example: "https://example.com/course-material.pdf"
     *               uploadedBy:
     *                 type: string
     *                 example: "John Doe"
     *     responses:
     *       201:
     *         description: Course created successfully
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */ this.router.post("/create", authGuard, async (req, res) => {
      try {
        const course = await courseService.createCourse(req.body);
        res.json(course);
      } catch (error) {
        handleError(error, res);
      }
    });

    /**
     * @swagger
     * /courses/user-courses/{userId}:
     *   get:
     *     summary: Get courses by user
     *     description: Fetch all courses created by a specific user.
     *     tags:
     *       - Courses
     *     parameters:
     *       - in: path
     *         name: userId
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the user
     *     responses:
     *       200:
     *         description: A list of user courses.
     *       404:
     *         description: User not found
     *       500:
     *         description: Internal server error
     */
    this.router.get("/user-courses/:userId", async (req, res) => {
      try {
        const courses = await courseService.getCoursesByUser(req.params.userId);
        res.json(courses);
      } catch (error) {
        handleError(error, res);
      }
    });

    /**
     * @swagger
     * /courses/update:
     *   put:
     *     summary: Update a course
     *     description: Allows an authenticated user to update a course.
     *     tags:
     *       - Courses
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               id:
     *                 type: string
     *                 example: "12345"
     *               title:
     *                 type: string
     *                 example: "Introduction to JavaScript"
     *               description:
     *                 type: string
     *                 example: "A beginner-friendly course on JavaScript."
     *               image:
     *                 type: string
     *                 example: "https://example.com/course-image.jpg"
     *               subject:
     *                 type: string
     *                 example: "Programming"
     *               course:
     *                 type: string
     *                 example: "JavaScript Basics"
     *               resourceUrl:
     *                 type: string
     *                 format: uri
     *                 example: "https://example.com/course-material.pdf"
     *               uploadedBy:
     *                 type: string
     *                 example: "John Doe"
     *     responses:
     *       201:
     *         description: Course updated successfully
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal server error
     */
    this.router.put("/update", authGuard, async (req, res) => {
      try {
        const course = await courseService.updateCourse(req.body);
        res.json(course);
      } catch (error) {
        handleError(error, res);
      }
    });

    /**
     * @swagger
     * /courses/delete/{id}:
     *   delete:
     *     summary: Delete a course
     *     description: Allows an authenticated user to delete a course by ID.
     *     tags:
     *       - Courses
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the course
     *     responses:
     *       200:
     *         description: Course deleted successfully
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Course not found
     *       500:
     *         description: Internal server error
     */

    this.router.delete("/delete/:id", authGuard, async (req, res) => {
      try {
        const course = await courseService.deleteCourse(req.params.id);
        res.json(course);
      } catch (error) {
        handleError(error, res);
      }
    });

    /**
     * @swagger
     * /courses/course/{id}:
     *   get:
     *     summary: Get course by ID
     *     description: Fetch details of a specific course by ID.
     *     tags:
     *       - Courses
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the course
     *     responses:
     *       200:
     *         description: Course details retrieved successfully
     *       404:
     *         description: Course not found
     *       500:
     *         description: Internal server error
     */
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
