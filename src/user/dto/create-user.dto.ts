import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { LoginType, UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly name: string;

  @IsString()
  readonly nickname: string;

  @IsEnum(LoginType)
  readonly login_type: LoginType;

  @IsEnum(UserRole)
  readonly user_role: UserRole;

  @IsString()
  readonly access_token;
}
