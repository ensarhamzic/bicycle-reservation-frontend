import { IUser } from './user.model';

export interface IAuth {
  user: IUser;
  token: string;
}
