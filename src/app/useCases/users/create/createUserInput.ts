import type { User } from "../../../entities";

export interface CreateUserInput
  extends Omit<User, "id" | "createdAt" | "passwordHash"> {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserOutput extends Omit<User, "passwordHash"> {}
