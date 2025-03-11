export interface CreateCourseInput {
  title: String;
  description: String;
  image: string;
  subject: string;
  course: string;
  resourceUrl: String; // Link to video/PDF
  uploadedBy: string;
}

export interface UpdateCourseInput extends Partial<CreateCourseInput> {
  id: string;
}
