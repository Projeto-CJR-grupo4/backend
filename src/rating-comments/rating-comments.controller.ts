import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RatingCommentsService } from './rating-comments.service';
import { CreateRatingCommentDto } from './dto/create-rating-comment.dto';
import { UpdateRatingCommentDto } from './dto/update-rating-comment.dto';

@Controller('rating-comments')
export class RatingCommentsController {
  constructor(private readonly ratingCommentsService: RatingCommentsService) {}

  @Post()
  create(@Body() createRatingCommentDto: CreateRatingCommentDto) {
    return this.ratingCommentsService.create(createRatingCommentDto);
  }

  @Get()
  findAll() {
    return this.ratingCommentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingCommentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingCommentDto: UpdateRatingCommentDto) {
    return this.ratingCommentsService.update(+id, updateRatingCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingCommentsService.remove(+id);
  }
}
