import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class ForgotpassworbytokenVerifiedDto{

    @IsNotEmpty()
    token: string;
        
    @IsNotEmpty()
    @IsString()
    @IsNotEmpty()
    @Matches(
      /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?_₹]).{8,32}$/,
      { message: 'Password is too weak' },
    )
    resetpassword: string;

}