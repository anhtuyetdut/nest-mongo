import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength, MinLength } from 'class-validator';

export class ProductCreateDto {
  @MaxLength(200)
  @MinLength(1)
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty()
  number: number;

  @IsOptional()
  @ApiProperty()
  status: boolean;

  @IsOptional()
  @ApiProperty()
  price: number;

  @ApiProperty()
  categoryId: number;
}

export class ProductUpdateDto {
  @IsOptional()
  @MaxLength(200)
  @MinLength(1)
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty()
  number: number;

  @IsOptional()
  @ApiProperty()
  price: number;

  @IsOptional()
  @ApiProperty()
  status: boolean;

  @IsOptional()
  @ApiProperty()
  categoryId: string;
}
