import { IsNotEmpty, IsOptional, IsString, IsInt, Min, IsUrl } from 'class-validator';

export class CreateLojaDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsInt()
    @Min(1)
    user_id!: number;

    @IsInt()
    @Min(1)
    category_id!: number;

    @IsOptional()
    @IsUrl()
    logo_url?: string;

    @IsOptional()
    @IsUrl()
    banner_url?: string;

    @IsOptional()
    @IsUrl()
    sticker_url?: string;
}