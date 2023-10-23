import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class EmailDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  subject: string;

  @IsString()
  @MinLength(1)
  @MaxLength(5000)
  message: string;

  @IsEmail()
  to: string;
}