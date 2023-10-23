import { BadRequestException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import VerificationTokenPayload from './verificationTokenPayload.interface';
import { Logger } from 'nestjs-pino';
import { MailService } from 'src/mail/mail.service';



@Injectable()
export class EmailConfirmationService{
    constructor(
        private readonly jwtService: JwtService,
        private logger: Logger,
        private mailerService :MailService ,
    ){}


    async sendVerificationLink(details) {
        const {email} =details.data
        const payload:VerificationTokenPayload={email:details.email}
        const token =this.jwtService.sign(payload,{
            secret:process.env.JWT_VERIFICATION_TOKEN_SECRET,
            expiresIn: process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME
        })
        const resetPasswordUrl = `${process.env.EMAIL_CONFIRMATION_URL}?token=${token}`;

        const emaildata={
            email: email,
            subject: 'Reset Password',
            template: 'passwordToken', 
            name: `${details.firstName} ${details.lastName}`,
            token:  details.randomToken,
            url: resetPasswordUrl,
        }
        
        return this.mailerService.forgetpassword(emaildata)

    }
 
}
