import { IsString, Matches, Max, MaxLength, Min, MinLength } from "class-validator";

export class ChangePasswordDto {
    @IsString({ message: 'A senha antiga é obrigatória.' })
    oldPassword: string;

    @IsString({ message: 'A nova senha é obrigatória.' })
    @MinLength(8, { message: 'A nova senha deve ter pelo menos 8 caracteres.' })
    @MaxLength(20, { message: 'A nova senha deve ter no máximo 20 caracteres.' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*(?:\d|[^\w\s]))\S+$/, {
    message:
      'A senha deve conter letras maiúsculas, minúsculas e pelo menos um número ou símbolo, sem espaços.',
  })
  newPassword: string;
}