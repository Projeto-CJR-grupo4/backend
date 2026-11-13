import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(60)
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*(?:\d|[^\w\s]))\S+$/, {
    message: 'A senha deve conter letras maiúsculas, minúsculas e pelo menos um número ou símbolo, sem espaços.',
  })
  password: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  @MaxLength(500)
  profilePictureUrl?: string;
}