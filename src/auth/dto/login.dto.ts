import { LoginTypeEnum } from '../../user/entities/user.entity';
import { IsEnum, IsString } from 'class-validator';

export class LoginInfo {
  @IsEnum(LoginTypeEnum)
  readonly loginType: LoginTypeEnum;

  @IsString()
  readonly code: string;
}
