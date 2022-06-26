import { ConflictException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "./user.model";
import * as bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { Repository } from "typeorm";
import { LoginDto } from "./dto/login.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import { ConfigService } from "@nestjs/config";
import { PROVIDERS } from "../common/enums/providers";


@Injectable()
export class UsersService {

    constructor(
        @Inject(PROVIDERS.USER)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService
    ) {

    }


    async findOne(email: string): Promise<User> {
        const user  = await this.userRepository.findOne({
            where: {
                email: email
            }
        });
        return user;
    }

    async create(user: SignUpDto): Promise<void> {
        const existed = await this.findOne(user.email);
        if (existed) {
            throw new ConflictException();
        }
        const hash = await bcrypt.hash(user.password, 10);
        const created = await this.userRepository.insert({
            name: user.name,
            email: user.email,
            password: hash
        });
        console.log(created);

    }


    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.findOne(email);
        let valid = false;
        if (user) {
            valid = await this.comparePassword(pass, user.password);
        }
        return valid;
    }

    async login(user: LoginDto) {
        const payload = { email: user.email };
        const findUser = this.validateUser(user.email, user.password);
        console.log(findUser);

        if (!findUser) {
            throw new UnauthorizedException();
        }
        return {
            access_token: sign(
                payload,
                this.configService.get("jwt").secret,
                { expiresIn: "1y" }
            )
        };
    }

    async signup(user: any) {
        const payload = { name: user.name, email: user.email, password: user.password };
        console.log(payload);

        await this.create(payload);
        return {
            message: "user created"
        };
    }

    private comparePassword = (
        password: string,
        hash: string
    ): Promise<boolean> => {
        return compare(password, hash);
    };
}