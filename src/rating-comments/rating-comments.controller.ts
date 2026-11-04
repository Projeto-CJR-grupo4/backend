import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { RatingCommentsService } from './rating-comments.service';
import { CreateRatingCommentDto } from './dto/create-rating-comment.dto';
import { UpdateRatingCommentDto } from './dto/update-rating-comment.dto';
import { StoreRating } from '../store-ratings/entities/store-rating.entity';
import { ProductRating } from '../product-ratings/entities/product_rating.entity';

@Controller('rating-comments')
export class RatingCommentsController {
  constructor(private readonly ratingCommentsService: RatingCommentsService) {}

  @Post()
  create(@Body() createRatingCommentDto: CreateRatingCommentDto) {
    return this.ratingCommentsService.create(createRatingCommentDto);
  }

  @Get()
  findAll(
    @Query('storeRatingId', new ParseIntPipe({ optional: true }))
    storeRatingId?: number,
    @Query('procutRatingId', new ParseIntPipe({ optional: true }))
    productRatingId?: number,
  ) {
    return this.ratingCommentsService.findAll(storeRatingId, productRatingId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ratingCommentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateRatingCommentDto: UpdateRatingCommentDto) {
    return this.ratingCommentsService.update(id, updateRatingCommentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ratingCommentsService.remove(id);
  }
}
