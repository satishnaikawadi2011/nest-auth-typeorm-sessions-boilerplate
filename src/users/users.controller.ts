import { UserDto } from 'src/users/dtos/user.dto';
import { Serialize } from './../interceptors/serialize.interceptor';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Post('/register')
	createUser(@Body() body: CreateUserDto) {
		this.usersService.create(body.username, body.email, body.password);
	}

	@Get('/:id')
	async findUser(@Param('id') id: string) {
		const user = await this.usersService.findOne(id);
		if (!user) {
			throw new NotFoundException('user not found !');
		}
		return user;
	}

	@Delete('/:id')
	removeUser(@Param('id') id: string) {
		return this.usersService.remove(id);
	}

	@Patch('/:id')
	updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
		return this.usersService.update(id, body);
	}
}
