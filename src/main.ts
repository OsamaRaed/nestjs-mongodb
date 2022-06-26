import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "./common/guards/auth.guard";
import { UsersService } from "./users/users.service";


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    const userService = app.get(UsersService);
    app.useGlobalGuards(new AuthGuard(userService));
    await app.listen(3000);
}

bootstrap();
