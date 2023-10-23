import { ArrayUnique, IsAlpha, IsEmail, IsIn, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';



export class CreateUserBySocialDto {
  email: string;
  firstName: string;
  lastName: string;

}