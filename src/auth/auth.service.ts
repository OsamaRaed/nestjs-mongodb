import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
// import { JwtService } from "@nestjs/jwt";
import { sign } from "jsonwebtoken";
import { use } from "passport";
import { compare } from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService
    ) {
    }
    
    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        let valid = false;
        if (user) {
            valid = await this.comparePassword(pass, user.password)
        }
        return valid;
    }
    
    async login(user: any) {
        console.log(user);
        const payload = { email: user.email };
        const findUser = this.validateUser(user.email, user.password);
        if (!findUser) {
            throw new UnauthorizedException();

        }
        return {
            access_token: sign(payload, process.env.JWT_SECRET)
        };
    }
    
    async signup(user: any) {
        const payload = { name: user.name, email: user.email, password: user.password };
        await this.usersService.create(payload);
        return {
            message: "user created"
        };
    }
    
    private comparePassword = (
        password: string,
        hash: string,
    ): Promise<boolean> => {
        return compare(password, hash);
    };
}
