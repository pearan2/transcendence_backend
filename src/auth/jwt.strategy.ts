import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy, AuthGuard } from '@nestjs/passport';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더에서 가져온다. 헤더에 포함되어있어야함.
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
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    // console.log('hi Im JwtGuard!');
    // 추후에 이곳에서 roleGuard 역할까지 하면 될듯.
    return true;
  }
}
