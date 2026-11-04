import { Module } from '@nestjs/common';
import { ProductRatingsService } from './product_ratings.service';
import { ProductRatingsController } from './product_ratings.controller';
import { Prisma } from '@prisma/client';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductRatingsController],
  providers: [ProductRatingsService],
})
export class ProductRatingsModule {}
