import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendMail(email: string, token: string) {
      try {
        await this.mailerService.sendMail({
          to: email,
          from: process.env.MAIL_FROM,
          subject: "Email Verification for instafusion",
          template: "D:\\InstaFusion_Social_Media-master\\InstaFusion_Social_Media\\dist\\mail\\templates\\emailVerification.hbs",
          context: { token }, 
        });
        return { success: true, message: 'Email sent successfully' };
      } catch (error) {
        console.error('Error sending email:', error);
        throw error;
      }
    }


    async forgetpassword(data: any) {
      const response = await this.mailerService.sendMail({
        to: data.email,
        from: process.env.MAIL_FROM,
        subject: data.subject,
        template: 'passwordToken.hbs',
        context: { ...data }
      })
      if (!!response) {
        return { success: true, message: 'Email sent successfully' };
      }
      return new UnprocessableEntityException('There is some error!')
    }
   
}
