import { Module } from '@nestjs/common';
import { TodoService } from "./todos.service";
import { DatabaseModule } from "../database/database.module";
import { TodoProviders } from "./todos.provider";
import { TodoController } from "./todos.controller";
import { UsersModule } from "../users/users.module";

@Module({
    imports: [DatabaseModule,UsersModule],
    providers: [TodoService,...TodoProviders],
    exports: [TodoService],
    controllers:[TodoController]
})
export class TodosModule {}
