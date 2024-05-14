import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserEntity } from "src/entity/user.entity";
import { Repository } from "typeorm";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'hdthegtaajsgtehshhsjdhe'
        });
    }

    async validate(payload: { id: number, username: string }) {
        const { id } = payload
        const user = await this.userRepo.findOneBy({ id })


        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}