import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private repo: Repository<User>) {}

	create(username: string, email: string, password: string) {
		const user = this.repo.create({ email, password, username });

		return this.repo.save(user);
	}

	findOne(id: string) {
		return this.repo.findOne(id);
	}

	async update(id: string, attrs: Partial<User>) {
		const user = await this.findOne(id);
		if (!user) {
			throw new NotFoundException('user not found!');
		}
		Object.assign(user, attrs);
		return this.repo.save(user);
	}

	async remove(id: string) {
		const user = await this.findOne(id);
		if (!user) {
			throw new NotFoundException('user not found!');
		}
		return this.repo.remove(user);
	}
}
