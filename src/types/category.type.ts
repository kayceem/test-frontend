import { IBase } from './base.type';

export interface ICategory extends IBase {
  _id: string;
  name: string;
  description: string;
  cateImage: string | ArrayBuffer | null | undefined;
  cateSlug: string;
  parentId?: string; // 0, 1, 2
  createdAt?: string;
  courses?: number;
}
