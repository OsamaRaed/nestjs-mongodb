import { ConfigService } from "@nestjs/config";
import { PROVIDERS } from "../common/enums/providers";
import { User } from "../users/user.model";
import { Todo } from "../todos/todo.model";
import { DataSource } from "typeorm";


export const databaseProvider = [

    {
        provide: PROVIDERS.DATABASE_CONNECTION,
        useFactory: async (configService: ConfigService) => {
            const dataSource = new DataSource({
                type: "mongodb",
                host: configService.get("database").host || "localhost",
                port: configService.get("database").port || 27017,
                database: configService.get("database").database,
                entities: [User, Todo],
                logging: true,
                synchronize: true,
                useNewUrlParser: true
            });
            return await dataSource.initialize();
        },
        inject: [ConfigService],
    }
];

