export interface User {
  _id: string;
  name: string;
  avatar: string;
}

export interface Lesson {
  _id: string;
  name: string;
}

export interface INote {
  _id: string;
  title: string;
  userId: User;
  lessonId: Lesson;
  courseId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  videoMinute: number;
}
