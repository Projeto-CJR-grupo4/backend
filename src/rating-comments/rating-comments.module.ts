import { Module } from '@nestjs/common';
import { RatingCommentsService } from './rating-comments.service';
import { RatingCommentsController } from './rating-comments.controller';

@Module({
  controllers: [RatingCommentsController],
  providers: [RatingCommentsService],
})
export class RatingCommentsModule {}
