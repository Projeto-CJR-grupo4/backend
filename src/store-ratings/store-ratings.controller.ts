import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Req,
} from '@nestjs/common';
import { StoreRatingsService } from './store-ratings.service';
import { CreateStoreRatingDto } from './dto/create-store-rating.dto';
import { UpdateStoreRatingDto } from './dto/update-store-rating.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';

type AuthReq = { user: { id: number } };

@Controller('store-ratings')
export class StoreRatingsController {
  constructor(private readonly storeRatingsService: StoreRatingsService) { }

  @Post()
  create(@Req() req: AuthReq, @Body() dto: CreateStoreRatingDto) {
    return this.storeRatingsService.create(req.user.id, dto);
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

  @IsPublic()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.storeRatingsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthReq,
    @Body() dto: UpdateStoreRatingDto,
  ) {
    return this.storeRatingsService.update(id, req.user.id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: AuthReq) {
    return this.storeRatingsService.remove(id, req.user.id);
  }
}