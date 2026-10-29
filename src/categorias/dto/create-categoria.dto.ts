import { IsNotEmpty, IsString, IsInt, IsOptional, Min } from 'class-validator';

export class CreateCategoriaDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsInt()
    @IsOptional()
    @Min(1)
    parent_category_id?: number;
}
