import { User } from "@prisma/client";
import { User as UserEntity } from "../entities";

export abstract class UsersRepository {
  abstract create(input: UserEntity): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
}
