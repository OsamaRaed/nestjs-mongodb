import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { TodosModule } from "./todos/todos.module";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import configFile from '../configDb'

@Module({
    imports: [
        DatabaseModule,
        UsersModule,
        TodosModule,
        ConfigModule.forRoot({
            load: [configFile],
            isGlobal: true,
        }),
    ],
})
export class AppModule { }
