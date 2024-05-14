import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from 'src/dto/signup-user.dto';
import * as bcrypt from 'bcryptjs'
import { LoginDto } from 'src/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>, private jwt: JwtService) { }


        //Sign up user business logic
    async signup(signupDto: SignUpDto) {
        const { username, password } = signupDto
        const user = await this.userRepo.findOneBy({username})
        if(user)throw new BadRequestException("username already exists")
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt);

        const newUser = this.userRepo.create({

            username,
            password: hashed
        })


        try {
            return await this.userRepo.save(newUser)

        } catch (error) {
            throw new InternalServerErrorException("something went wrong, user not created")
        }



    }



    //Login user business Logic
    async login(loginDto: LoginDto) {

        const { username, password } = loginDto
        
        const user = await this.userRepo.findOneBy({ username })



        if (!user) {
            throw new UnauthorizedException('Invalid credentials1')
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials')

        }
        const jwtPayload = { id: user.id, username: user.username }
        const jwtToken = await this.jwt.signAsync(jwtPayload)
        return {
            user: username,
            token: jwtToken
        }


    }
}
