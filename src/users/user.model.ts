import { Entity, ObjectID, ObjectIdColumn, Column, OneToMany } from "typeorm";
import { Todo } from "../todos/todo.model";


@Entity("user")
export class User  {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;


    @OneToMany(type => Todo, todo => todo.user_id)
    todos: Todo[];
}
