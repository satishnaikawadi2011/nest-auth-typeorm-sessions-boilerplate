import { AuthGuard } from './../guards/auth.guard';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { Body, UseGuards } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
	constructor(private todoService: TodosService) {}

	@Post()
	@UseGuards(AuthGuard)
	createTodo(@Body() body: CreateTodoDto) {
		return this.todoService.create(body);
	}
}
