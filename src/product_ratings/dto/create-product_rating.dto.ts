import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class CreateProductRatingDto {
    @IsInt()
    user_id: number;

    @IsInt()
    product_id: number;

    @IsInt()
    @Min(0)
    rating: number;

    @IsOptional()
    @IsString()
    comment?: string;
}
