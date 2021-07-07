import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ //this module exports is provider for jwt service like token, so we can injected in dependecy injection
      secret: "topSecret51",
      signOptions: {
        expiresIn: 3600,
      } 
    }),
    TypeOrmModule.forFeature([UserRepository])],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule] //so it can be used in other modules
})
export class AuthModule { }
