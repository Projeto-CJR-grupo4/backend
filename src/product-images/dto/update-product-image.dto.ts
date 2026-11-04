import { PartialType } from '@nestjs/mapped-types';
import { CreateProductImageDto } from './create-product-image.dto';
import { IsInt, IsOptional, IsUrl, Min } from 'class-validator';

export class UpdateProductImageDto extends PartialType(CreateProductImageDto) {
    @IsOptional()
    @IsUrl({ require_tld: false })
    image_url?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    order?: number;

}
