import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Req } from '@nestjs/common';
import { StoreRatingsService } from './store-ratings.service';
import { CreateStoreRatingDto } from './dto/create-store-rating.dto';
import { UpdateStoreRatingDto } from './dto/update-store-rating.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import type { Request } from 'express';
type RequisicaoAutenticada = Request & {
  user: { id: number };
};
@Controller('store-ratings')
export class StoreRatingsController {
  constructor(private readonly storeRatingsService: StoreRatingsService) { }

  @Post()
  create(@Body() dto: CreateStoreRatingDto, @Req() req: RequisicaoAutenticada) {
    return this.storeRatingsService.create(dto, req.user.id);
  }

  @IsPublic()
  @Get()
  findAll(
    @Query('storeId') storeId?: string,
    @Query('userId') userId?: string,
  ) {
    return this.storeRatingsService.findAll(
      storeId ? Number(storeId) : undefined,
      userId ? Number(userId) : undefined,
    );
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
