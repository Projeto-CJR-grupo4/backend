import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductRatingDto } from './dto/create-product_rating.dto';
import { UpdateProductRatingDto } from './dto/update-product_rating.dto';

@Injectable()
export class ProductRatingservice {
  constructor(private prisma: PrismaService) {}
  create(dto: CreateProductRatingDto) {
    return this.prisma.productRatings.create({ data: dto });
  }

  findAll() {
    return this.prisma.productRatings.findMany({ include: {user: true, product: true}});
  }

  async findOne(id: number) {
    const product_rating = await this.prisma.productRatings.findUnique({ where: { id }});
    if (!product_rating) { throw new NotFoundException(`Produto ${id} não encontrado`); }
    return product_rating;
  }

  async update(id: number, dto: UpdateProductRatingDto) {
    await this.findOne(id);
    return this.prisma.productRatings.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.productRatings.delete({ where: { id } });
  }
}
