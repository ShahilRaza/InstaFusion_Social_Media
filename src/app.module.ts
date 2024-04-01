import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './User/User.modules';
import { validationSchema } from '../config/validation';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { LoggerModule } from 'nestjs-pino';
import pino from 'pino';
import { User } from './enitties/user.entities';
import { MailModule } from './mail/mail.module';
import { ProfileModule } from './Profile/profile/profile.module';
import { FollowModule } from './Follow/follow/follow.module';
import { NotificationModule } from './Notification-system/notification/notification.module';
import { PostModule } from './Post-system/post/post.module';
import { CommentLikeModule } from './Comment-Like-System/comment-like/comment-like.module';
//import { AuthModule } from './auth/auth.module';

const transport = pino.transport({
  target: 'pino/file',  
  options: {
    destination: process.env.LOG_DESTINATION,
    mkdir: true,
  },
});
const logger = pino(transport);
@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      expandVariables: true,
  }),
    TypeOrmModule.forRoot({
      type:'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User],
    autoLoadEntities: true,
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy(),
    }),
    UsersModule,
    MailModule,
    FollowModule,
    ProfileModule,
    NotificationModule,
    PostModule,
    CommentLikeModule,
    LoggerModule.forRoot({
      pinoHttp: {
        logger,        
      },
    }),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
