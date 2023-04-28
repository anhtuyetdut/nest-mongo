import { IsEnum, IsOptional, MaxLength } from 'class-validator';
import { Role } from '../../../utils';
export class UserCreateDto {
  @MaxLength(100)
  username: string;

  @MaxLength(100)
  password: string;

  @IsEnum(Role)
  role: Role.LEARNER;

  @MaxLength(100)
  email: string;

  @IsOptional()
  gender: boolean;
}
