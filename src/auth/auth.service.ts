import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: CreateUserDto) {
    const { access_token, ...payload } = user;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
