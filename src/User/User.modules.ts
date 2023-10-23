import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/enitties/user.entities';
import { UsersController } from './User.controller';
import { UsersService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from '../mail/mail.service';
import { RefreshToken } from '../enitties/Refresh-token.entity';
import { JwtStrategy } from './jwt.strategy';
import { EmailConfirmationService } from './emailConfirmation.service';
import { UserProfile } from '../Profile/profile/entites/user-profile.entity';
//import { LocalStrategy } from "passport-local"

//import { Usertoken } from 'src/enitties/usertoken.entities';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: "jwt",
    }),
    ConfigModule.forRoot(), 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string | number>('TOKEN_VALIDITY'),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User,RefreshToken,UserProfile]),
  ],
  providers: [UsersService,MailService,JwtStrategy,EmailConfirmationService,],
  controllers: [UsersController],
})
export class UsersModule {}
