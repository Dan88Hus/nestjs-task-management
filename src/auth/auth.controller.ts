import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    
    @Post("/signup") ///auth/signup
    async singUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void>{
        // console.log(authCredentialsDto) //now we need to return service
        return await this.authService.signup(authCredentialsDto)
    }
}
