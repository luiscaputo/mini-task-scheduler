import { Body, Controller, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserUseCase } from "../../../../app/useCases/users/create/createUser.useCase";
import { AuthUseCase } from "../../../../app/useCases/users/auth/auth.UseCase";
import { AuthUserDTO, CreateUserDTO } from "./users.dtos";
import { Response } from "express";

@ApiTags("USERS")
@Controller("users")
export class UsersController {
  constructor(
    private readonly _createUserUseCase: CreateUserUseCase,
    private readonly _authUseCase: AuthUseCase
  ) {}

  @Post()
  async store(@Body() body: CreateUserDTO, @Res() res: Response) {
    const { name, email, password } = body;

    const index = await this._createUserUseCase.execute({
      name,
      email,
      password,
    });

    return res.status(index.status).json(index.data);
  }

  @Post("login")
  async auth(@Body() body: AuthUserDTO, @Res() res: Response) {
    const { email, password } = body;

    const auth = await this._authUseCase.execute({
      email,
      password,
    });

    return res.status(auth.status).json(auth.data);
  }
}
