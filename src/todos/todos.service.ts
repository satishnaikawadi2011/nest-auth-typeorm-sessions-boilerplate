import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
	constructor(@InjectRepository(Todo) private repo: Repository<Todo>) {}

	create(todoDto: CreateTodoDto) {
		const todo = this.repo.create(todoDto);
		return this.repo.save(todo);
	}
}
