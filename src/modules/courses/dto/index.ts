import { IsOptional, MaxLength } from 'class-validator';

export class CourseDto {
  @MaxLength(300)
  name: string;

  cost: number;

  @MaxLength(6000)
  description: string;

  @MaxLength(1000)
  image: string;
}

export class CourseUpdateDto {
  @IsOptional()
  @MaxLength(300)
  name: string;

  @IsOptional()
  cost: number;

  @IsOptional()
  @MaxLength(6000)
  description: string;

  @IsOptional()
  @MaxLength(1000)
  image: string;

  @IsOptional()
  updated_at = new Date();
}
