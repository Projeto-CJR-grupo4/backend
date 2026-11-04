import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreRatingDto } from './dto/create-store-rating.dto';
import { UpdateStoreRatingDto } from './dto/update-store-rating.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StoreRatingsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateStoreRatingDto) {
    return this.prisma.storeRating.create({ data: dto });
  }

  findAll(storeId?: number) {
    return this.prisma.storeRating.findMany({
      where: storeId? { store_id: storeId } : undefined,
      include: { user: { select: { id: true, username: true, profile_picture_url: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const rating = await this.prisma.storeRating.findUnique({
      where: { id },
      include: { comments: true },
    });
    if(!rating) throw new NotFoundException(`Avaliação ${id} não encontrada`);
    return rating;
  }

  async update(id: number, dto: UpdateStoreRatingDto) {
    await this.findOne(id);
    return this.prisma.storeRating.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.storeRating.delete({ where: { id } });
  }
}
