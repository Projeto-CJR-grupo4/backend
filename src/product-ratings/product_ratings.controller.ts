import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Req,
} from '@nestjs/common';
import { ProductRatingsService } from './product_ratings.service';
import { CreateProductRatingDto } from './dto/create-product_rating.dto';
import { UpdateProductRatingDto } from './dto/update-product_rating.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';

type AuthReq = { user: { id: number } };

@Controller('product-ratings')
export class ProductRatingsController {
  constructor(private readonly productRatingsService: ProductRatingsService) {}

  @Post()
  create(@Req() req: AuthReq, @Body() dto: CreateProductRatingDto) {
    return this.productRatingsService.create(req.user.id, dto);
  }

  @IsPublic()
  @Get()
  findAll(
    @Query('productId') productId?: string,
    @Query('userId') userId?: string,
  ) {
    return this.productRatingsService.findAll(
      productId ? Number(productId) : undefined,
      userId ? Number(userId) : undefined,
    );
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productRatingsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthReq,
    @Body() dto: UpdateProductRatingDto,
  ) {
    return this.productRatingsService.update(id, req.user.id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: AuthReq) {
    return this.productRatingsService.remove(id, req.user.id);
  }
}