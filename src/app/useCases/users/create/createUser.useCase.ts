import { Injectable } from "@nestjs/common";
import { IUseCase } from "../../../../shareds/app/UseCase";
import {
  badRequestResponse,
  errorResponse,
  HttpResponse,
  successResponse,
} from "../../../../shareds/contracts/httpContracts";
import { User } from "../../../entities";
import { UsersRepository } from "../../../repositories";
import { ErrorMessages } from "../../../../shareds/enums";
import { CreateUserInput, type CreateUserOutput } from "./createUserInput";

@Injectable()
export class CreateUserUseCase implements IUseCase {
  constructor(private readonly applicationRepository: UsersRepository) {}
  async execute(
    request: CreateUserInput,
  ): Promise<HttpResponse<CreateUserOutput>> {
    try {
      const userAlreadyExists = await this.applicationRepository.findByEmail(
        request.email.trim(),
      );
      if (userAlreadyExists) {
        return badRequestResponse({
          message: ErrorMessages.USER_ALREADY_EXISTS,
        });
      }
      const user = new User({
        name: request.name.trim(),
        email: request.email.trim(),
        passwordHash: request.password,
        createdAt: new Date(),
      });

      await this.applicationRepository.create(user);
      return successResponse(user as CreateUserOutput);
    } catch (error: any) {
      return errorResponse(error);
    }
  }
}
