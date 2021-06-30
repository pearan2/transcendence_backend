import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { LoginInfo } from './dto/login.dto';
import * as fetch from 'node-fetch';
import { LoginTypeEnum, UserRoleEnum } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async get42AccessToken(code: string) {
    const requestURI = process.env.FORTYTWO_GET_TOKEN_URI;

    //authorization_code -> 엑세스토큰과 리프래쉬 토큰을 다 줌.
    //client_credentials -> 이건 expired 가 7200 인데 리프래쉬 토큰은 없음.
    let queryString: string =
      '' +
      'grant_type=' +
      'authorization_code' +
      '&' +
      'client_id=' +
      process.env.FORTYTWO_CLIENT_ID +
      '&' +
      'client_secret=' +
      process.env.FORTYTWO_CLIENT_SECRET +
      '&' +
      'code=' +
      code +
      '&' +
      'redirect_uri=' +
      process.env.FORTYTWO_REDIRECT_URI +
      '&' +
      'scope=public';

    const access_token: string = await fetch(requestURI + queryString, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Mobile': 'false',
      },
    })
      .then((res) => res.json())
      .then((data) => data.access_token);

    return access_token;
  }

  async get42Profile(access_token: string) {
    const data = await fetch('https://api.intra.42.fr/v2/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + access_token,
      },
    }).then((res) => res.json());

    return data;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const loginInfo: LoginInfo = req.body;
    if (
      loginInfo === undefined ||
      loginInfo.code === undefined ||
      loginInfo.loginType === undefined
    )
      return false;

    if (loginInfo.loginType === LoginTypeEnum.FORTYTWO) {
      try {
        const access_token = await this.get42AccessToken(loginInfo.code);

        if (access_token === undefined) {
          console.error('access_token undefined');
          return false;
        }
        const userProfile = await this.get42Profile(access_token);
        if (userProfile === undefined) {
          console.error('userProfile undefined');
          return false;
        }

        const newUser: CreateUserDto = {
          email: userProfile.email,
          name: userProfile.first_name + userProfile.last_name,
          nickname: userProfile.login,
          image_url: userProfile.image_url,
          login_type: LoginTypeEnum.FORTYTWO,
          access_token: access_token,
        };

        await this.userService.create(newUser);
        req.user = newUser;

        return true;
      } catch {
        return false;
      }
    }
    return false;
  }
}
