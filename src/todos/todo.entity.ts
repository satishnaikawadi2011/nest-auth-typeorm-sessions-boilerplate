import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
	@PrimaryGeneratedColumn('uuid') id: string;

	@Column() title: string;

	@Column() description: string;

	@ManyToOne(() => User, (user) => user.todos)
	user: User;
}
