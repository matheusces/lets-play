import { User } from "../../../entities/User";

export interface IUserRepository {
  find(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User | null>;
}
