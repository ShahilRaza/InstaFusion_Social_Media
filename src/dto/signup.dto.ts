//import { IsEmail, IsString, MaxLength, MinLength } from '@nestjs/class-validator';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


export class SignUpdto {
    @IsString()
    firstname: string;
  
    @IsString()
    lastname: string;
  
    @IsEmail({},{message:"please enter correct email address"})
    email: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;

  }