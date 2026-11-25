import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Req,
} from '@nestjs/common';
import { RatingCommentsService } from './rating-comments.service';
import { CreateRatingCommentDto } from './dto/create-rating-comment.dto';
import { UpdateRatingCommentDto } from './dto/update-rating-comment.dto';

type AuthReq = { user: { id: number } };

@Controller('rating-comments')
export class RatingCommentsController {
  constructor(private readonly ratingCommentsService: RatingCommentsService) {}

  @Post()
  create(@Req() req: AuthReq, @Body() dto: CreateRatingCommentDto) {
    return this.ratingCommentsService.create(req.user.id, dto);
  }

  @Get()
  findAll(
    @Query('storeRatingId', new ParseIntPipe({ optional: true }))
    storeRatingId?: number,
    @Query('productRatingId', new ParseIntPipe({ optional: true }))
    productRatingId?: number,
  ) {
    return this.ratingCommentsService.findAll(storeRatingId, productRatingId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ratingCommentsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthReq,
    @Body() dto: UpdateRatingCommentDto,
  ) {
    return this.ratingCommentsService.update(id, req.user.id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: AuthReq) {
    return this.ratingCommentsService.remove(id, req.user.id);
  }
}