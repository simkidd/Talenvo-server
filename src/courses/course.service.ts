import { User } from "../users/user.schema";
import { cloudinaryUpload } from "../utils/cloudinaryUpload";
import { CreateCourseInput, UpdateCourseInput } from "./course.dto";
import { Course, CourseDocument } from "./course.schema";

export class CourseService {
  async getCourses(): Promise<CourseDocument[]> {
    try {
      return await Course.find();
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async createCourse(input: CreateCourseInput): Promise<CourseDocument> {
    const { image } = input;
    try {
      const isCourse = await Course.findOne(input.description);
      if (isCourse) throw new Error("Course already exist.");
      const course = new Course(input);
      if (image) {
        const imageUrl = await cloudinaryUpload(image);
        course.image = imageUrl;
      }
      await course.save();
      return course;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async updateCourse(input: UpdateCourseInput): Promise<CourseDocument> {
    try {
      const course = await Course.findById(input.id);
      if (!course) throw new Error("Course not found.");
      Object.assign(course, input);
      await course.save();
      return course;
    } catch (error) {
      throw new Error(String(error));
    }
  }
  public async deleteCourse(id: string) {
    try {
      const course = await this.findCourseById(id);
      await course.deleteOne();
      return course.id;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async getCoursesByUser(id: string): Promise<CourseDocument[]> {
    try {
      const foundCourses = await Course.find({ uploadedBy: id }).exec();

      if (!foundCourses.length)
        throw new Error("No courses found for this user.");

      return foundCourses;
    } catch (error) {
      throw new Error(String(error));
    }
  }
  public async getCourseById(id: string) {
    return await this.findCourseById(id);
  }

  private async findCourseById(id: string): Promise<CourseDocument> {
    try {
      const course = await Course.findById(id);
      if (!course) throw new Error("Course not found");
      return course;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
