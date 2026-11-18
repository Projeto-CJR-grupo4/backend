import { IsNotEmpty, IsOptional, IsString, IsInt, Min, IsUrl, Matches } from 'class-validator';

export class CreateLojaDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsOptional()
    @IsString()
    description?: string;
    
    @IsInt()
    @Min(1)
    category_id!: number;

    @IsOptional()
    @Matches(/^(https?:\/\/.+|\/.+)$/, {
      message: 'logo_url deve ser uma URL completa ou um caminho começando com /',
    })
    logo_url?: string;

    @IsOptional()
    @Matches(/^(https?:\/\/.+|\/.+)$/, {
      message: 'banner_url deve ser uma URL completa ou um caminho começando com /',
    })
    banner_url?: string;

    @IsOptional()
    @Matches(/^(https?:\/\/.+|\/.+)$/, {
      message: 'sticker_url deve ser uma URL completa ou um caminho começando com /',
    })
    sticker_url?: string;
}