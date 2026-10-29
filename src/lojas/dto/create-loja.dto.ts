import { IsNotEmpty, IsOptional, IsString, IsInt, Min } from 'class-validator';

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
}