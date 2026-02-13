import { User } from '../entities/user';

export interface UserRepository {
  store(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  destroy(id: string): Promise<void>;
}
