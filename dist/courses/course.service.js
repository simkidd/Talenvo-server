"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const cloudinaryUpload_1 = require("../utils/cloudinaryUpload");
const course_schema_1 = require("./course.schema");
class CourseService {
    async getCourses() {
        try {
            return await course_schema_1.Course.find();
        }
        catch (error) {
            throw new Error(String(error));
        }
    }
    async createCourse(input) {
        const { image } = input;
        try {
            const isCourse = await course_schema_1.Course.findOne(input.description);
            if (isCourse)
                throw new Error("Course already exist.");
            const course = new course_schema_1.Course(input);
            if (image) {
                const imageUrl = await (0, cloudinaryUpload_1.cloudinaryUpload)(image);
                course.image = imageUrl;
            }
            await course.save();
            return course;
        }
        catch (error) {
            throw new Error(String(error));
        }
    }
    async updateCourse(input) {
        try {
            const course = await course_schema_1.Course.findById(input.id);
            if (!course)
                throw new Error("Course not found.");
            Object.assign(course, input);
            await course.save();
            return course;
        }
        catch (error) {
            throw new Error(String(error));
        }
    }
    async deleteCourse(id) {
        try {
            const course = await this.findCourseById(id);
            await course.deleteOne();
            return course.id;
        }
        catch (error) {
            throw new Error(String(error));
        }
    }
    async getCoursesByUser(id) {
        try {
            const foundCourses = await course_schema_1.Course.find({ uploadedBy: id }).exec();
            if (!foundCourses.length)
                throw new Error("No courses found for this user.");
            return foundCourses;
        }
        catch (error) {
            throw new Error(String(error));
        }
    }
    async getCourseById(id) {
        return await this.findCourseById(id);
    }
    async findCourseById(id) {
        try {
            const course = await course_schema_1.Course.findById(id);
            if (!course)
                throw new Error("Course not found");
            return course;
        }
        catch (error) {
            throw new Error(String(error));
        }
    }
}
exports.CourseService = CourseService;
