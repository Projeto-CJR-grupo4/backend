import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateStoreRatingDto {
    @IsInt()
    store_id: number;

    @IsInt()
    @Min(0)
    @Max(5)
    rating: number;
    @IsOptional()
    @IsString()
    comment?: string;
}
