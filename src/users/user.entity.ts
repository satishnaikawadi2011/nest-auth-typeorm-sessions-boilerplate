import { Exclude } from 'class-transformer';
import { Todo } from 'src/todos/todo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid') id: string;

	@Column({ unique: true })
	username: string;

	@Column() email: string;

	@Column() password: string;

	@OneToMany(() => Todo, (todo) => todo.user)
	todos: Todo[];
}
