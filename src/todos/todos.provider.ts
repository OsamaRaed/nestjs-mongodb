import { PROVIDERS } from '../common/enums/providers';
import { Todo } from './todo.model';
import { DataSource } from "typeorm";

export const TodoProviders = [
    {
        provide: PROVIDERS.TODO,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Todo),
        inject: [PROVIDERS.DATABASE_CONNECTION],
    },
];
