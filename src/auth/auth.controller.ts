import { Body, Controller, Post, UseGuards, ValidationPipe, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    
    @Post("/signup") ///auth/signup
    async singUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void>{
        // console.log(authCredentialsDto) //now we need to return service
        return await this.authService.signup(authCredentialsDto)
    }

    @Post("/signin")
    async signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>{
        return this.authService.signIn(authCredentialsDto)
    }
    @Post("/test")
    @UseGuards(AuthGuard())
    test(@Req() req){
        console.log(req)
    }

}
