import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'transcendenceOftranscendence',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService],
  exports: [JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
