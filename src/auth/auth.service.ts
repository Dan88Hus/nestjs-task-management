import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor( //constructorlar bir cesit dependecies list area
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,){}
    
    async signup(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        return await this.userRepository.signUp(authCredentialsDto)
    }
    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>{
        const username = await this.userRepository.validateUserPassword(authCredentialsDto)
        // console.log(username)
        if(!username){
            throw new UnauthorizedException("Invalid Credentials")
        }
        // now we create jwt payload 
        const payload: JwtPayload = { username } // can add some more info such as roles, email  and etc
        const accessToken = await this.jwtService.sign(payload) // generate token
        // console.log("access token")
        return { accessToken }
    }
}
