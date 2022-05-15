import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime';
import { IsNotEmpty, isNotEmpty, Min, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  name: string;

  @ApiProperty()
  id: string;

  @ApiProperty({ required: false })
  description?: string;

  @Min(1.0)
  @ApiProperty()
  price: Decimal;

  @ApiProperty()
  sku: string;

  @ApiProperty({ required: false, default: true })
  published?: boolean = false;
}
