import { User } from '../entities/user';

export interface UserRepository {
  store(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  destroy(id: string): Promise<void>;
}
