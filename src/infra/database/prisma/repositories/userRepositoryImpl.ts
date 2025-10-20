import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../../../../app/repositories";
import { User as UserEntity } from "../../../../app/entities";
import { PrismaService } from "../prismaService";
import { User } from "@prisma/client";

@Injectable()
export class UsersRepositoryImpl implements UsersRepository {
  constructor(private readonly _prisma: PrismaService) {}
  async create(input: UserEntity): Promise<void> {
    await this._prisma.user.create({
      data: {
        id: input.id,
        name: input.name,
        email: input.email,
        passwordHash: input.passwordHash,
        createdAt: input.createdAt,
      },
    });
  }
  async findByEmail(email: string): Promise<User | null> {
    return this._prisma.user.findUnique({
      where: { email },
    });
  }
  async findById(id: string): Promise<User | null> {
    return this._prisma.user.findUnique({ where: { id } });
  }
}
