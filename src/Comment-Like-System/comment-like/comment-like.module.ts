import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntities } from './Comment-like-Entities/comment-like.entities';
import { CommentLikeController } from './comment-like.controller';
import { CommentLikeService } from './comment-like.service';
import { CaptionEntities } from '../../Post-system/PostEntities/caption.entities';
import { NotificationService } from '../../Notification-system/notification/notification.service';
import { DeviceToken } from '../../Notification-system/notification/entities/device-token.entity';
import { UserFollow } from '../../Follow/follow/entities/userfollow.entities';
import { User } from '../../enitties/user.entities';
import { LikeEntities } from './Comment-like-Entities/like-entities';
//import { CommentReplyEntities } from './Comment-like-Entities/coment-reply-Entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentEntities,
      CaptionEntities,
      DeviceToken,
      UserFollow,
      User,
      LikeEntities
      //CommentReplyEntities
    ]),
  ],
  providers: [CommentLikeService, NotificationService],
  controllers: [CommentLikeController],
})
export class CommentLikeModule {}
