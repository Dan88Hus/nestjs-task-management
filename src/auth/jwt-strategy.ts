import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import * as config from 'config'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(@InjectRepository(UserRepository)
        private userRepository: UserRepository,){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Header da Bearer Yazacagiz
            secretOrKey: process.env.JWT_SECRET || config.get("jwt.secret"), //auth.module daki

        }) //we call constructor of base class
    } // token we created is verified, if its not it throw error

    async validate(payload:JwtPayload): Promise<User>{
        const { username } = payload
        const user = await this.userRepository.findOne({username})
        if(!user){
            throw new UnauthorizedException()
        }
        return user
    }
}