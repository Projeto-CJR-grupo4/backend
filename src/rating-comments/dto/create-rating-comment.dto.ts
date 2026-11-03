import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRatingCommentDto {
    @IsInt()
    user_id: number;

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
