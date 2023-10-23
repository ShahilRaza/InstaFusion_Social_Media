import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { EmailDto } from 'src/dto/mail.dto';

@Controller('mail')
export class MailController {
    constructor(
        private readonly mailService:MailService,
    ){}

    @Post('sent') 
    async MailSent(@Body() data:EmailDto) {
     //return await this.mailService.sendMail(data)
    }
}
