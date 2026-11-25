import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductRatingDto } from './dto/create-product_rating.dto';
import { UpdateProductRatingDto } from './dto/update-product_rating.dto';

@Injectable()
export class ProductRatingsService {
  constructor(private prisma: PrismaService) {}

  private readonly userSelect = {
    select: { id: true, name: true, username: true, profile_picture_url: true },
  };

  create(userId: number, dto: CreateProductRatingDto) {
    return this.prisma.productRatings.create({
      data: {
        user_id: userId,
        product_id: dto.product_id,
        rating: dto.rating,
        comment: dto.comment,
      },
    });
  }

  findAll(productId?: number, userId?: number) {
    return this.prisma.productRatings.findMany({
      where: {
        ...(productId != null && { product_id: productId }),
        ...(userId != null && { user_id: userId }),
      },
      include: {
        user: { select: { id: true, username: true, name: true, profile_picture_url: true } },
        product: {
          include: { store: { select: { id: true, name: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const rating = await this.prisma.productRatings.findUnique({
      where: { id },
      include: {
        user: this.userSelect,
        product: {
          select: {
            id: true,
            name: true,
            store: { select: { id: true, name: true, user_id: true } },
          },
        },
        comments: {
          orderBy: { createdAt: 'asc' },
          include: { user: this.userSelect },
        },
      },
    });
    if (!rating) throw new NotFoundException(`Avaliação ${id} não encontrada`);

    const ownerId = rating.product.store.user_id;
    return {
      ...rating,
      comments: rating.comments.map((c) => ({
        ...c,
        is_store_owner: c.user_id === ownerId,
      })),
    };
  }

  private async assertOwner(id: number, userId: number) {
    const rating = await this.prisma.productRatings.findUnique({ where: { id } });
    if (!rating) throw new NotFoundException(`Avaliação ${id} não encontrada`);
    if (rating.user_id !== userId) {
      throw new ForbiddenException('Você só pode alterar suas próprias avaliações.');
    }
  }

  async update(id: number, userId: number, dto: UpdateProductRatingDto) {
    await this.assertOwner(id, userId);
    return this.prisma.productRatings.update({
      where: { id },
      data: { rating: dto.rating, comment: dto.comment },
    });
  }

  async remove(id: number, userId: number) {
    await this.assertOwner(id, userId);
    return this.prisma.productRatings.delete({ where: { id } });
  }
}