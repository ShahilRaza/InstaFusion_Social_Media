import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @ApiProperty({ required: false })
    @IsEmail()
    email: string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    password: string;
}
  