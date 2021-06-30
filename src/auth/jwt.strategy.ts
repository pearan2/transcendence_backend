import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy, AuthGuard } from '@nestjs/passport';
import { Injectable, ExecutionContext, Request } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'transcendenceOftranscendence',
    });
  }

  async validate(payload: any) {
    return payload;
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // 아래 함수를 사용 할 경우 정상적으로 expired 가 판별되지 않음. 아마
  // jwt 변조도 파악하지 못할것으로 예상.
  // async canActivate(context: ExecutionContext): Promise<boolean> {
  //   const req = context.switchToHttp().getRequest();
  //   // console.log('hi Im JwtGuard!');
  //   // 추후에 이곳에서 roleGuard 역할까지 하면 될듯.
  //   return true;
  // }
}
