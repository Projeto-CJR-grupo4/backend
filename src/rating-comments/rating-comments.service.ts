import { Injectable } from '@nestjs/common';
import { CreateRatingCommentDto } from './dto/create-rating-comment.dto';
import { UpdateRatingCommentDto } from './dto/update-rating-comment.dto';

@Injectable()
export class RatingCommentsService {
  create(createRatingCommentDto: CreateRatingCommentDto) {
    return 'This action adds a new ratingComment';
  }

  findAll() {
    return `This action returns all ratingComments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ratingComment`;
  }

  update(id: number, updateRatingCommentDto: UpdateRatingCommentDto) {
    return `This action updates a #${id} ratingComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} ratingComment`;
  }
}
