import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateProductRatingDto } from './create-product_rating.dto';

export class UpdateProductRatingDto extends PartialType(
    OmitType(CreateProductRatingDto, ['product_id'] as const),
) {}
