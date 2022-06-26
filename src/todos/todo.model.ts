import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import { User } from "../users/user.model";

@Table
export class Todo extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;
    
    @Column
    title: string;
    
    @Column
    description: string;
    
    @Column
    status: boolean;
    
    
    @ForeignKey( () => User )
    user_id: number
}
