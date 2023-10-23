import {IsNotEmpty,IsString,Matches, MaxLength, MinLength } from 'class-validator';
  
  export class UpdatePasswordDto {
    @IsNotEmpty()
    @IsString()
    @IsNotEmpty()
    @Matches(
      /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?_₹]).{8,32}$/,
      { message: 'Password is too weak' },
    )
    oldPassword: string;
  
    @IsNotEmpty()
    @IsString()
    @IsNotEmpty()
    @Matches(
      /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?_₹]).{8,32}$/,
      { message: 'Password is too weak' },
    )
    newPassword: string;
  }
  