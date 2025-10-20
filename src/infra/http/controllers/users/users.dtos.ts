import { IsNotEmpty, IsString, IsEmail, Allow } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @Allow()
  name: string;

  @IsString()
  @IsEmail()
  @Allow()  
  email: string;

  @IsString()
  @IsNotEmpty()
  @Allow()
  password: string;
}


export class AuthUserDTO implements Omit<CreateUserDTO, 'name'> {
  @IsString()
  @IsEmail()
  @Allow()  
  email: string;

  @IsString()
  @IsNotEmpty()
  @Allow()
  password: string;
}
