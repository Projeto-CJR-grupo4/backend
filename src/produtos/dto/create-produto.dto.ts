import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProdutoDto {
    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsOptional()
    @IsString()
    descricao?: string;

    @IsNumber()
    @Min(0)
    preco: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    estoque?: number;

    @IsInt()
    lojaId: number;

    @IsInt()
    categoriaId: number;
}

