import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { StoreRatingsService } from './store-ratings.service';
import { CreateStoreRatingDto } from './dto/create-store-rating.dto';
import { UpdateStoreRatingDto } from './dto/update-store-rating.dto';

@Controller('store-ratings')
export class StoreRatingsController {
  constructor(private readonly storeRatingsService: StoreRatingsService) {}

  @Post()
  create(@Body() dto: CreateStoreRatingDto) {
    return this.storeRatingsService.create(dto);
  }

  @Get()
  findAll(@Query('storeId', new ParseIntPipe({ optional: true })) storeId?: number) {
    return this.storeRatingsService.findAll(storeId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.storeRatingsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateStoreRatingDto) {
    return this.storeRatingsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.storeRatingsService.remove(id);
  }
}
