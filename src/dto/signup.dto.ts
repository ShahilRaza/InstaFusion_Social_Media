//import { IsEmail, IsString, MaxLength, MinLength } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


export class SignUpdto {
  
   @ApiProperty({ required: false })
    @IsString()
    firstname: string;
  
    @ApiProperty({ required: false })
    @IsString()
    lastname: string;
  
    @ApiProperty({ required: false })
    @IsEmail({},{message:"please enter correct email address"})
    email: string;
  
    @ApiProperty({ required: false })
    @IsString()
    @IsNotEmpty()
    password: string;

  }