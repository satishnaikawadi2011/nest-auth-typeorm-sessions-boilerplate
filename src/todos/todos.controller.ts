import { TodoDto } from './dtos/todo.dto';
import { AuthGuard } from './../guards/auth.guard';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { Body, UseGuards } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('todos')
export class TodosController {
	constructor(private todoService: TodosService) {}

	@Post()
	@UseGuards(AuthGuard)
	@Serialize(TodoDto)
	createTodo(@Body() body: CreateTodoDto, @CurrentUser() user: User) {
		return this.todoService.create(body, user);
	}
}
