import { Module } from '@nestjs/common';
import { RatingCommentsService } from './rating-comments.service';
import { RatingCommentsController } from './rating-comments.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RatingCommentsController],
  providers: [RatingCommentsService],
})
export class RatingCommentsModule {}
