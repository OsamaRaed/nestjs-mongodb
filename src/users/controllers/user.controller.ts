import { Controller, Get } from "@nestjs/common";


@Controller("users")
export class UsersController {
    
    @Get("profile")
    async profile() {
    
    }
}