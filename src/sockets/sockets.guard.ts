import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class SocketsGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const client: Socket = context.switchToWs().getClient<Socket>();
    const cookie: string = client.handshake?.headers?.cookie;
    if (cookie === undefined) return false;
    const jwtToken = cookie.split('jwtToken=')[1]?.split(';')[0];
    if (jwtToken === undefined) return false;

    try {
      const user = this.jwtService.verify(jwtToken); // 정상적이지 않은 토큰이라면 에러를 뿜게 된다.
      client.user = user;
      return true;
    } catch (e) {
      client.disconnect();
      throw new WsException(e.message);
    }
  }
}
