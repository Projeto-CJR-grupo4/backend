import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateStoreRatingDto } from './create-store-rating.dto';

export class UpdateStoreRatingDto extends PartialType(
    OmitType (CreateStoreRatingDto, ['user_id', 'store_id'] as const), 
) {}
