import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/dto/signup-user.dto';
import { LoginDto } from 'src/dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.decorator';
import { UserEntity } from 'src/entity/user.entity';
import { ApiBasicAuth, ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';



@ApiBearerAuth()
@ApiTags('authentication Controller')
@Controller('api/auth')
export class AuthController {

    constructor(private authService: AuthService) { }


    //Sign up user
    @ApiOperation({summary: "signup new user"})
    @Post('signup')
    signup(@Body() signupDto: SignUpDto) {
        return this.authService.signup(signupDto)

    }

    //sign in user
    @Post('signin')
    @ApiOperation({summary: "log in user"})
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto)
    }

    //Get current User
    @Get('currentUser')
    @ApiOperation({summary: "get current user"})
    @UseGuards(AuthGuard())
    validauth(@User() user: UserEntity) {
        return user;
    }
}
