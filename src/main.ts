import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users/users.service";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "./common/guards/auth.guard";


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    const userService = app.get(UsersService);
    app.useGlobalGuards(new AuthGuard(userService), app.get(ConfigService));
    await app.listen(3000);
}
//new AuthGuard(userService),
bootstrap();
