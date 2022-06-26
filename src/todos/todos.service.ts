import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Todo } from "./todo.model";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { PROVIDERS } from "../common/enums/providers";
import { Connection, MongoRepository, ObjectID, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/user.model";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class TodoService {
    constructor(
        @Inject(PROVIDERS.TODO)
        private readonly todoRepository: Repository<Todo>
    ) {
    }

    async findAll(id: string): Promise<Todo[]> {
        return this.todoRepository.find({ where: { user_id: id } });
        return null;
    }

    async findOne(user_id: string, id: string): Promise<Todo> {
        // console.log(new ObjectID(id))
        return await this.todoRepository.find({
            where: {
                // id: id,
                user_id: user_id,
            }
        })[0];
    }

    async remove(user_id: string, id: string): Promise<any> {
        // const task = await this.findOne(user_id, id);
        // if (!task) {
        //     throw new NotFoundException();
        // }
        await this.todoRepository.delete(id);
        return {
            message: "task deleted"
        };

    }

    async create(user_id: string, task: CreateTodoDto): Promise<any> {
        await this.todoRepository.insert({
            title: task.title,
            description: task.description,
            user_id: user_id,
            status: false
        });
        return {
            message: "task created"
        };
    }

    async update(user_id: string, id: string, body: any): Promise<any> {
        // const task = await this.findOne(user_id, id);
        // if (!task) {
        //     throw new NotFoundException();
        // }
        await this.todoRepository.update(id,body);
        return {
            message: "task updated"
        };
    }
}