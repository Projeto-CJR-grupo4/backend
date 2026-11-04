import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRatingCommentDto } from './dto/create-rating-comment.dto';
import { UpdateRatingCommentDto } from './dto/update-rating-comment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RatingCommentsService {
  constructor(private prisma: PrismaService) {}

  private readonly userSelect = {
    select: { id: true, username: true, profile_picture_url: true },
  };

  async create(dto: CreateRatingCommentDto) {
    const hasStore = dto.store_rating_id != null;
    const hasProduct = dto.product_rating_id != null;

    if(hasStore === hasProduct) {
      throw new BadRequestException(
        'Informe exatamente um entre store_rating_id e product_rating_id',
      );
    }

    const user = await this.prisma.user.findUnique({
      where: {id: dto.user_id },
    });
    if(!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if(hasStore){
      const rating = await this.prisma.storeRating.findUnique({
        where: { id: dto.store_rating_id },
      });
      if(!rating) {
        throw new NotFoundException('Avaliação de loja não encontrada');
      }
    }
    else {
      const rating = await this.prisma.productRatings.findUnique({
        where: { id: dto.product_rating_id },
      });
      if(!rating){
        throw new NotFoundException('Avaliação de produto não encontrada');
      }
    }

    return this.prisma.ratingComments.create({
      data: dto,
      include: { user: this.userSelect },
    });
  }

  findAll(storeRatingId?: number, productRatingId?: number) {
    return this.prisma.ratingComments.findMany({
      where: {
        ...(storeRatingId != null && { store_rating_id: storeRatingId }),
        ...(productRatingId != null && { product_rating_id: productRatingId}),
      },
      include: { user: this.userSelect },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findOne(id: number) {
    const comment = await this.prisma.ratingComments.findUnique({
      where: { id },
      include: { user: this.userSelect },
    });
    if(!comment) throw new NotFoundException('Comentário não encontrado');
    return comment;
  }

  async update(id: number, dto: UpdateRatingCommentDto) {
    await this.findOne(id);
    return this.prisma.ratingComments.update({
      where: { id },
      data: { content: dto.content },
      include: { user: this.userSelect },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.ratingComments.delete({ where: { id } });
  }
}
