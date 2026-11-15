import { IsInt, IsOptional, IsUrl, Matches, Min } from "class-validator";

export class CreateProductImageDto {
    @IsInt()
    product_id: number;

    @Matches(/^(https?:\/\/.+|\/.+)$/, {
        message: 'logo_url deve ser uma URL completa ou um caminho começando com /',
    })
    image_url: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    order?: number;
}
