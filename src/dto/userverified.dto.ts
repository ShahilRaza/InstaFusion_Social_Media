import { IsEmail, IsString, MaxLength, MinLength } from '@nestjs/class-validator';


export class UserverifiedDto {
    
    @IsEmail({},{message:"please enter correct email address"})
    email: string;
  
    @IsString()
    token: string;

}