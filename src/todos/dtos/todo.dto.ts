import { Expose, Transform } from 'class-transformer';

export class TodoDto {
	@Expose() id: string;

	@Expose() title: string;

	@Expose() description: string;

	@Transform(({ obj }) => obj.user.id)
	@Expose()
	userId: string;
}
