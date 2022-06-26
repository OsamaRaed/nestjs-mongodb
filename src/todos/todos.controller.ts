import { Controller, Post, Body, UseGuards, Get, Request, Put, Param, Delete } from "@nestjs/common";
import { TodoService } from "./todos.service";
import { AuthGuard } from "../common/guards/auth.guard";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";


@UseGuards(AuthGuard)
@Controller("todos")
export class TodoController {
    
    constructor(private readonly todoService: TodoService) {
    }
    
    @Get()
    async getTodos(@Request() req) {
        return  this.todoService.findAll(req.body.user.id);
    }
    
    @Post()
    async postTodos(@Request() req, @Body() body: CreateTodoDto) {
        return  this.todoService.create(req.body.user.id, body);
    }

    @Put(":id")
    async updateTodos(@Request() req, @Body() body: UpdateTodoDto, @Param() params) {
        return  this.todoService.update(req.body.user.id, params.id, body);
    }
    
    @Delete(":id")
    async deleteTodos(@Param() params, @Request() req) {
        return  this.todoService.remove(req.body.user.id, params.id);
    }
}
