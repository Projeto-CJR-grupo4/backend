import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProdutoDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    stock: number;

    @IsInt()
    store_id: number;

    @IsInt()
    category_id: number;
}

