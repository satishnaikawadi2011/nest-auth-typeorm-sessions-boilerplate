import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
	constructor(@InjectRepository(Todo) private repo: Repository<Todo>) {}

	create(todoDto: CreateTodoDto, user: User) {
		const todo = this.repo.create(todoDto);
		todo.user = user;
		return this.repo.save(todo);
	}
}
