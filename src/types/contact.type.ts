import { IBase } from './base.type';

export interface IContact extends IBase {
  _id: string;
  name: string;
  email: string;
  message: string;
}
