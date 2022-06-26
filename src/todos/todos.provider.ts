import { PROVIDERS } from '../common/enums/providers';
import { Todo } from './todo.model';

export const TodoProviders = [
    {
        provide: PROVIDERS.TODO,
        useValue: Todo,
    },
];
