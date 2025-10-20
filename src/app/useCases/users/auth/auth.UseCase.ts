import { Injectable } from "@nestjs/common";
import { IUseCase } from "../../../../shareds/app/UseCase";
import {
  badRequestResponse,
  errorResponse,
  HttpResponse,
  successResponse,
} from "../../../../shareds/contracts/httpContracts";
import { UsersRepository } from "../../../repositories";
import { AuthInput, AuthOutput } from "./authInput";
import { ErrorMessages } from "../../../../shareds/enums";
import { Password } from "../../../../shareds/helpers/Password";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthUseCase implements IUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  async execute(request: AuthInput): Promise<HttpResponse<AuthOutput>> {
    try {
      const getUser = await this.usersRepository.findByEmail(request.email);
      if (!getUser) {
        return badRequestResponse({ message: ErrorMessages.USER_NOT_FOUND });
      }

      const isPasswordValid = await Password.comparePasswords(
        request.password,
        getUser.passwordHash,
      );
      if (!isPasswordValid) {
        return badRequestResponse({
          message: ErrorMessages.INVALID_USER_OR_PASSWORD,
        });
      }

      const token = await this.generateToken(getUser.id, getUser.email);
      const authOutput: AuthOutput = {
        id: getUser.id,
        email: getUser.email,
        token,
      };

      return successResponse(authOutput);
    } catch (error: any) {
      return errorResponse(error.message);
    }
  }
  private async generateToken(id: string, email: string) {
    const payload = {
      sub: id,
      email: email,
    };
    return this.jwtService.signAsync(payload, {
      expiresIn: "60d",
      secret: process.env.JWT_SECRET,
    });
  }
}
