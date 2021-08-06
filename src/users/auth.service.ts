import { TodosService } from './../todos/todos.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}

	async signup(email: string, username: string, password: string) {
		const usersByEmailorUsername = await this.usersService.findByEmailOrUsername(email, username);
		if (usersByEmailorUsername.length) {
			throw new BadRequestException('Email or username already in use !');
		}

		// TODO: Generate salt and hash the password
		const salt = randomBytes(8).toString('hex');
		const hash = (await scrypt(password, salt, 32)) as Buffer;
		const result = `${salt}.${hash.toString('hex')}`;

		const user = await this.usersService.create(username, email, result);

		return user;
	}

	async signin(username: string, password: string) {
		const [
			user
		] = await this.usersService.find({ username });

		if (!user) {
			throw new NotFoundException('User not found !');
		}

		const [
			salt,
			storedHash
		] = user.password.split('.');

		const hash = (await scrypt(password, salt, 32)) as Buffer;

		if (storedHash !== hash.toString('hex')) {
			throw new BadRequestException('Invalid credentials !');
		}

		return user;
	}
}
