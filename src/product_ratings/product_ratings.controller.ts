import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ProductRatingsService } from './product_ratings.service';
import { CreateProductRatingDto } from './dto/create-product_rating.dto';
import { UpdateProductRatingDto } from './dto/update-product_rating.dto';

@Controller('product-ratings')
export class ProductRatingsController {
  constructor(private readonly productRatingsService: ProductRatingsService) {}

  @Post()
  create(@Body() createProductRatingDto: CreateProductRatingDto) {
    return this.productRatingsService.create(createProductRatingDto);
  }

  @Get()
  findAll(@Query('productId', new ParseIntPipe({ optional: true })) productId?: number) {
    return this.productRatingsService.findAll(productId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productRatingsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductRatingDto: UpdateProductRatingDto) {
    return this.productRatingsService.update(id, updateProductRatingDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productRatingsService.remove(id);
  }
}
