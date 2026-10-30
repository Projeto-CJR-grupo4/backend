import { Module } from '@nestjs/common';
import { ProductRatingsService } from './product_ratings.service';
import { ProductRatingsController } from './product_ratings.controller';

@Module({
  controllers: [ProductRatingsController],
  providers: [ProductRatingsService],
})
export class ProductRatingsModule {}
