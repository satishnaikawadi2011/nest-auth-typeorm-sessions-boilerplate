import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Todo } from './todos/todo.entity';

@Module({
	imports:
		[
			TypeOrmModule.forRoot({
				type: 'sqlite',
				database: 'db.sqlite',
				entities:
					[
						User,
						Todo
					],
				synchronize: true
			}),
			UsersModule,
			TodosModule
		],
	controllers:
		[
			AppController
		],
	providers:
		[
			AppService
		]
})
export class AppModule {}
