import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowController } from './follow.controller';
import { UserFollow } from './entities/userfollow.entities';
import { User } from '../../enitties/user.entities';
import { NotificationService } from '../../Notification-system/notification/notification.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserFollow,User]),
  ],
  providers: [FollowService,NotificationService],
  controllers: [ FollowController ],
})
export class FollowModule {}
