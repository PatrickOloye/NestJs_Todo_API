import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
// import { Passport } from 'passport';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
JwtModule.register({
  secret: "hdthegtaajsgtehshhsjdhe",
  signOptions: {
    algorithm: "HS512",
    expiresIn: '1d',
  }},
  
),
PassportModule.register({
  defaultStrategy: 'jwt'
})
],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule, JwtStrategy]
})
export class AuthModule {}
