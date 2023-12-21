export interface IReview {
  _id: string;
  courseId: string;
  title: string;
  content: string;
  ratingStar: number;
  orderId: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}
