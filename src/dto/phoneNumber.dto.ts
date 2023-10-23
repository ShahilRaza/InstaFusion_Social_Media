import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class phoneDto {

  @IsNotEmpty()
  phone: string;

}