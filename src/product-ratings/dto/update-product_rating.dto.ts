import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateProductRatingDto } from './create-product_rating.dto';

export class UpdateProductRatingDto extends PartialType(
    OmitType(CreateProductRatingDto, [ 'user_id', 'product_id'] as const),
) {}
