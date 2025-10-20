import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { UsersController } from "./controllers/users/users.controller";
import { CreateUserUseCase } from "../../app/useCases/users/create/createUser.useCase";
import { AuthUseCase } from "../../app/useCases/users/auth/auth.UseCase";

@Module({
  imports: [DatabaseModule],
  controllers: [
    UsersController,
    CreateUserUseCase,
    AuthUseCase
  ],
  providers: [],
})

export class HttpModule {}