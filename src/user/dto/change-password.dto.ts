import { IsString, Matches, Max, MaxLength, Min, MinLength } from "class-validator";

export class ChangePasswordDto {
    @IsString()
    oldPassword: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*(?:\d|[^\w\s]))\S+$/, {
    message:
      'A senha deve conter letras maiúsculas, minúsculas e pelo menos um número ou símbolo, sem espaços.',
  })
  newPassword: string;
}