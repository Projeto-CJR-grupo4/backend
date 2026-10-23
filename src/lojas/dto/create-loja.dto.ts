import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLojaDto {
    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsOptional()
    @IsString()
    descricao?: string;
}
