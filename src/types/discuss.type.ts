import { IBase } from './base.type';

export interface User {
  _id: string;
  name: string;
  avatar: string;
}

export interface IDiscuss extends IBase {
  _id: string;
  lessonId: string;
  authorId: string;
  title: string;
  userId: User;
  comments: string;
  replies: IReply[];
}

export interface IReply extends IBase {
  userId: User;
  comments: string;
  courseId: string;
  lessonId: string;
}
