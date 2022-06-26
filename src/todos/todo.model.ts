import { Entity, ObjectID, ObjectIdColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../users/user.model";


@Entity("todos")
export class Todo {
    @ObjectIdColumn()
    id: ObjectID;
    
    @Column()
    title: string;
    
    @Column()
    description: string;
    
    @Column()
    status: boolean;

    @Column()
    user_id: string;
}
