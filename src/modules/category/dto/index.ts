import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';

export class CategoryDto {
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty()
  status: string;
}

export class CreateCategoryDto {
  @MaxLength(250)
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty()
  status = false;
}
