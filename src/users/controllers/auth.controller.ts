import { Controller, Post, Body } from "@nestjs/common";
import { LoginDto } from "../dto/login.dto";
import { SignUpDto } from "../dto/sign-up.dto";
import { UsersService } from "../users.service";

@Controller("auth")
export class AuthController {
    
    constructor(private readonly userService: UsersService) {
    }
    
    @Post("login")
    async login(@Body() body: LoginDto) {
        return this.userService.login(body);
    }
    
    @Post("signup")
    async signup(@Body() body: SignUpDto) {
        return this.userService.signup(body);
    }
}
