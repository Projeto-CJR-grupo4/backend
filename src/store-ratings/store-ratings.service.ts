import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreRatingDto } from './dto/create-store-rating.dto';
import { UpdateStoreRatingDto } from './dto/update-store-rating.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StoreRatingsService {
  constructor(private prisma: PrismaService) {}

  private readonly userSelect = {
    select: { id: true, name: true, username: true, profile_picture_url: true },
  };

  create(userId: number, dto: CreateStoreRatingDto) {
    return this.prisma.storeRating.create({
      data: {
        user_id: userId,
        store_id: dto.store_id,
        rating: dto.rating,
        comment: dto.comment,
      },
    });
  }

  findAll(storeId?: number, userId?: number) {
    return this.prisma.storeRating.findMany({
      where: {
        ...(storeId != null && { store_id: storeId }),
        ...(userId != null && { user_id: userId }),
      },
      include: {
        user: { select: { id: true, name: true, username: true, profile_picture_url: true } },
        store: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const rating = await this.prisma.storeRating.findUnique({
      where: { id },
      include: {
        user: this.userSelect,
        store: { select: { id: true, name: true, user_id: true } },
        comments: {
          orderBy: { createdAt: 'asc' },
          include: { user: this.userSelect },
        },
      },
    });
    if (!rating) throw new NotFoundException(`Avaliação ${id} não encontrada`);

    return {
      ...rating,
      comments: rating.comments.map((c) => ({
        ...c,
        is_store_owner: c.user_id === rating.store.user_id,
      })),
    };
  }

  private async assertOwner(id: number, userId: number) {
    const rating = await this.prisma.storeRating.findUnique({ where: { id } });
    if (!rating) throw new NotFoundException(`Avaliação ${id} não encontrada`);
    if (rating.user_id !== userId) {
      throw new ForbiddenException('Você só pode alterar suas próprias avaliações.');
    }
  }

  async update(id: number, userId: number, dto: UpdateStoreRatingDto) {
    await this.assertOwner(id, userId);
    return this.prisma.storeRating.update({
      where: { id },
      data: { rating: dto.rating, comment: dto.comment },
    });
  }

  async remove(id: number, userId: number) {
    await this.assertOwner(id, userId);
    return this.prisma.storeRating.delete({ where: { id } });
  }
}