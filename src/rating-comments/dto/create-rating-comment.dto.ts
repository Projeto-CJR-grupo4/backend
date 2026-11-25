import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRatingCommentDto {
    @IsOptional()
    @IsInt()
    store_rating_id?: number;

    @IsOptional()
    @IsInt()
    product_rating_id?: number;

    @IsString()
    @IsNotEmpty()
    content: string;
}   
