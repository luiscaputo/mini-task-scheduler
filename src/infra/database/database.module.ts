import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prismaService";
import { ConfigService } from "@nestjs/config";
import { ConfigModule } from "../config/config.module";
import { TasksRepository, UsersRepository } from "../../app/repositories";
import {
  TasksRepositoryImpl,
  UsersRepositoryImpl,
} from "./prisma/repositories";

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    ConfigService,
    PrismaService,
    {
      provide: UsersRepository,
      useClass: UsersRepositoryImpl,
    },
    {
      provide: TasksRepository,
      useClass: TasksRepositoryImpl,
    },
  ],
  exports: [PrismaService, UsersRepository, TasksRepository],
})
export class DatabaseModule {}
