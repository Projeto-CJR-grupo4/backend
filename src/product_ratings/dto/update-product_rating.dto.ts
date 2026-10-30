import { PartialType } from '@nestjs/mapped-types';
import { CreateProductRatingDto } from './create-product_rating.dto';

export class UpdateProductRatingDto extends PartialType(CreateProductRatingDto) {}
