import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { Request, Req } from '@nestjs/common';
import { UsersService } from './user.service'; 
import { SignUpdto } from '../dto/signup.dto'; 
import { MailService } from '.././mail/mail.service';
import { UserverifiedDto } from '../dto/userverified.dto';
import { LoginDto } from '../dto/login.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { CreateUserBySocialDto } from '../dto/userbysocialby.dto';
import { UpdatePasswordDto } from '../dto/updatepassword.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import * as jwt from 'jsonwebtoken';
import { ForgotPasswordLinkDto } from '../dto/forgotpassword.dto';
import { ForgotpassworbytokenVerifiedDto } from '../dto/forgotpasswordbytoken.dto';
import { phoneDto } from '../dto/phoneNumber.dto';




@ApiTags('UserApi')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService,
        private readonly mailService:MailService,) {}

    @Post('createUser') 
    async signUp(@Body() data: SignUpdto) {
     const newuser = await this.userService.SignUp(data)
     const {email,token}= newuser.user
     await this.mailService.sendMail(email,token)
     return { message: 'Registration successful. Please check your email for verification instructions.' };
    }
    
   
    @Post('userverified') 
    async mailverified(@Body() data:UserverifiedDto,){
     return await this.userService.VerifiedUser(data)
    }


    
    @Post('login')
    async login(@Body() data: LoginDto,@Request() req) {
     return await this.userService.userlogin(data)
     }


   @Post('refresh-token')
   async refreshToken(@Body() req : RefreshTokenDto) {
    await this.userService.refresh(req)
    
   }

 @UseGuards(AuthGuard('jwt'))
 @ApiBearerAuth('access-token')
 @Post('/social/google')
  async googleLogin(@Body() data: CreateUserBySocialDto) {
    return this.userService.google(data)
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Post('resetPassword')
  async reset(@Body() data: UpdatePasswordDto,@Request() req) {
    const jwtToken = req.headers.authorization.split('Bearer ')[1];
    const decodedToken = jwt.decode(jwtToken);
    if (typeof decodedToken === 'object' && decodedToken !== null) {
      const userId = decodedToken.userId;
      return await this.userService.passwordupdate({data,userId:userId})
    } 
   
  }

  @Post('forgotpassword/token')
  async forgot(@Body() data: ForgotPasswordLinkDto) {
   return this.userService.forgetPassword(data)
  }


  @Post('tokenverifiedforgotpassword/token')
  async forgortpasswordbytoken(@Body() data: ForgotpassworbytokenVerifiedDto) {
    return await this.userService.forgotTokenverifiedbyemil(data)
   
  }


  @Post('otpVerifiedbyphoneNumber/otp')
  async otpVerifiedbyphoneNumber(@Body() data: phoneDto) {
    return this.userService.otpverifiedbynumber(data)
  }
  
}