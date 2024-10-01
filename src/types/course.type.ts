import { IBase } from './base.type';

export enum AccessStatus {
  PAID = 'PAID',
  DRAFT = 'DRAFT',
  COMMING_SOON = 'COMMING_SOON',
  ENROLLMENT_CLOSED = 'ENROLLMENT_CLOSED',
  FREE = 'FREE',
  PRIVATE = 'PRIVATE'
}

export enum CourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT'
}

export interface ICourse extends IBase {
  _id: string;
  name: string;
  subTitle?: string;
  views?: number;
  description: string;
  price: number;
  finalPrice: number;
  access: AccessStatus;
  isBought?: boolean;
  level: CourseLevel;
  thumbnail: string;
  coursePreview: string;
  courseSlug: string;
  avgRatings?: number;
  numberUsersOfCourse?: number;
  categoryId: {
    _id: string;
    name: string;
  };
  userId?: {
    _id: string;
    name: string;
    avatar: string;
  }; // FK
  authorId?: {
    _id: string;
    name: string;
    avatar: string;
    biography: string;
  }; // FK
  requirements?: string[];
  willLearns?: string[];
  tags?: string[];
  learners?: number;
  createdAt?: string;
  updatedAt?: string;
}

