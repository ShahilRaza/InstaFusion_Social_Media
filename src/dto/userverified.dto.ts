import { IsEmail, IsString, MaxLength, MinLength } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UserverifiedDto {
    
    @ApiProperty({ required: false })
    @IsEmail({},{message:"please enter correct email address"})
    email: string;
  
    @ApiProperty({ required: false })
    @IsString()
    token: string;

}