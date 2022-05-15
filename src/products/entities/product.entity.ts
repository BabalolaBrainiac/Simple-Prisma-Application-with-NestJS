import { ApiProperty } from '@nestjs/swagger';
import { Product, Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';

export class ProductEntity implements Product {
  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty({ nullable: true, required: false })
  description: string;

  @Transform(({ value }) => value.toNumber())
  @ApiProperty({ type: Number })
  price: Prisma.Decimal;

  @ApiProperty()
  sku: string;

  @ApiProperty({ default: false })
  published: boolean;
}
