import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PushNotificationsController } from './notification.controller';
import { NotificationService } from './notification.service';
import { DeviceToken } from './entities/device-token.entity';
import { UserFollow } from '../../Follow/follow/entities/userfollow.entities';

@Module({
    imports: [
        TypeOrmModule.forFeature([DeviceToken,UserFollow]),
      ],
      providers: [NotificationService],
      controllers: [ PushNotificationsController],
})
export class NotificationModule {}
