import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Todo } from "./todo.model";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { PROVIDERS } from "../common/enums/providers";


@Injectable()
export class TodoService {
    constructor(
        @Inject(PROVIDERS.TODO) private readonly todoModel: typeof Todo
    ) {
    }
    
    
    async findAll(id: number): Promise<Todo[]> {
        return this.todoModel.findAll({ where: { user_id: id } });
    }
    
    async findOne(user_id: string, id: string): Promise<Todo> {
        return await this.todoModel.findOne({
            where: {
                id: id,
                user_id: user_id
            }
        });
    }
    
    async remove(user_id: string, id: string): Promise<any> {
        const task = await this.findOne(user_id, id);
        if (!task) {
            throw new NotFoundException();
        }
        await task.destroy();
        return {
            message: "task deleted"
        };
        
    }
    
    async create(user_id: string, task: CreateTodoDto): Promise<any> {
        await this.todoModel.create({
            title: task.title,
            description: task.description,
            user_id: user_id
        });
        return {
            message: "task created"
        };
    }
    
    async update(user_id: string, id: string, body: any): Promise<any> {
        const task = await this.findOne(user_id, id);
        if (!task) {
            throw new NotFoundException();
        }
        await task.update(body);
        return {
            message: "task updated"
        };
        
    }
}