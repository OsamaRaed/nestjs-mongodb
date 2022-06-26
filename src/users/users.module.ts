import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserProviders } from "./users.provider";
import { DatabaseModule } from "../database/database.module";
import { UsersController } from "./controllers/user.controller";
import { AuthController } from "./controllers/auth.controller";

@Module({
    imports: [DatabaseModule],
    providers: [UsersService, ...UserProviders],
    controllers: [UsersController, AuthController],
    exports: [UsersService]
})

export class UsersModule {
}
