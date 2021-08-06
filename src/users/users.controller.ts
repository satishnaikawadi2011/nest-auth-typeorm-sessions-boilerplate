import { SigninUserDto } from './dtos/signin-user.dto';
import { UserDto } from 'src/users/dtos/user.dto';
import { Serialize } from './../interceptors/serialize.interceptor';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
	constructor(private usersService: UsersService, private authService: AuthService) {}

	@Post('/register')
	createUser(@Body() body: CreateUserDto) {
		return this.authService.signup(body.email, body.username, body.password);
	}

	@Post('/signin')
	signin(@Body() body: SigninUserDto) {
		return this.authService.signin(body.username, body.password);
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
