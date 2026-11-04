import { IsInt, IsOptional, IsUrl, Min } from "class-validator";

export class CreateProductImageDto {
    @IsInt()
    product_id: number;

    @IsUrl({ require_tld: false })
    image_url: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    order?: number;
}
