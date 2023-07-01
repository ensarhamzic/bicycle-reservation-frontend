import { UserRole } from '../types/user-role.type';

export interface IUser {
  id: number;
  ime: string;
  prezime: string;
  username: string;
  email: string;
  imageUrl: string | null;
  role: UserRole;
  verified: boolean;
}
