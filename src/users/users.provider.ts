import { PROVIDERS } from '../common/enums/providers';
import { User } from './user.model';
import { DataSource } from "typeorm";

export const UserProviders = [
    {
        provide: PROVIDERS.USER,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: [PROVIDERS.DATABASE_CONNECTION],
    },
];
