import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { UserType } from 'generated/prisma/client';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  id: string;
  @IsString()
  @MinLength(3)
  ci: string;
  @IsEmail()
  @IsString()
  @MinLength(3)
  email: string;
  @IsString()
  @MinLength(3)
  password: string;
  @IsString()
  @MinLength(3)
  name: string;
  @IsString()
  @MinLength(3)
  lastName: string;
  @IsString()
  @MinLength(3)
  secondLastName: string;
  @IsString()
  @MinLength(3)
  cellphone: string;
  @IsString()
  @MinLength(3)
  profession: string;
  @IsString()
  @IsEnum(UserType)
  type: UserType;
}
