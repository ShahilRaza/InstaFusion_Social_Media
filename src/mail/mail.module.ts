// import { Module } from '@nestjs/common';
// import { MailController } from './mail.controller'; 
// import { MailService } from './mail.service'; 
// import { MailerModule } from '@nestjs-modules/mailer';

// @Module({
//   imports: [
//     MailerModule.forRootAsync({
//       useFactory: () => ({
//         transport: {
//           host: process.env.MAIL_HOST,
//           port: parseInt(process.env.MAIL_PORT),
//           secure: false, 
//           auth: {
//             user: process.env.MAIL_USERNAME,
//             pass: process.env.MAIL_PASSWORD,
//           },
//         },
//         defaults: {
//           from: process.env.MAIL_FROM,
//         },
//       }),
//     }),
//   ],
//   providers: [MailService], 
//   controllers: [MailController],
//   exports: [MailService], 
// })
// export class MailModule {}


import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
//import { ConfigModule } from '@nestjs/config';
//import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
     useFactory: () => {
        return ({
          transport: {
            host: process.env.MAIL_HOST,
            port: parseInt(process.env.MAIL_PORT),
            secure: false,
            auth: {
              user: process.env.MAIL_USERNAME,
              pass: process.env.MAIL_PASSWORD
            },
          },
          defaults: {
            from: '"instafusion" <instafusion@example.com>',
          },
          template: {
            dir: join(__dirname,  './templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            }
          }
        })
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule { }