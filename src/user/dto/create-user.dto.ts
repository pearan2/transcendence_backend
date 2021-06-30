import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { LoginTypeEnum, UserRoleEnum } from '../entities/user.entity';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly name: string;

  @IsString()
  readonly nickname: string;

  @IsEnum(LoginTypeEnum)
  readonly login_type: LoginTypeEnum;

  @IsString()
  readonly access_token: string;

  @IsOptional()
  @IsString()
  readonly image_url: string;
}
