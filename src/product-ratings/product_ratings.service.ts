import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductRatingDto } from './dto/create-product_rating.dto';
import { UpdateProductRatingDto } from './dto/update-product_rating.dto';

@Injectable()
export class ProductRatingsService {
  constructor(private prisma: PrismaService) {}
  create(dto: CreateProductRatingDto) {
    return this.prisma.productRatings.create({ data: dto });
  }

findAll(productId?: number) {
  return this.prisma.productRatings.findMany({
    where: productId ? { product_id: productId } : undefined,
    include: {
      user: { select: { id: true, username: true, name: true, profile_picture_url: true } },
      product: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

  async findOne(id: number) {
    const product_rating = await this.prisma.productRatings.findUnique({
      where: { id },
      include: { comments: true },
    });
    if (!product_rating) { throw new NotFoundException(`Avaliação ${id} não encontrada`); }
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
