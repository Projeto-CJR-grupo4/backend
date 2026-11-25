import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreRatingDto } from './dto/create-store-rating.dto';
import { UpdateStoreRatingDto } from './dto/update-store-rating.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StoreRatingsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateStoreRatingDto, userId: number) {
  return this.prisma.storeRating.create({
    data: {
      ...dto,
      user_id: userId
    }
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
