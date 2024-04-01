import { Inject, Injectable } from '@nestjs/common';
import { CommentEntities } from './Comment-like-Entities/comment-like.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaptionEntities } from '../../Post-system/PostEntities/caption.entities';
import { NotificationService } from '../../Notification-system/notification/notification.service';
import { User } from '../../enitties/user.entities';

@Injectable()
export class CommentLikeService {
  constructor(
    @InjectRepository(CommentEntities)
    private readonly commentlikeRepository: Repository<CommentEntities>,
    @InjectRepository(CaptionEntities)
    private readonly CaptionRepository: Repository<CaptionEntities>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly sendNotificationsService: NotificationService,
  ) {}

  async createcomment(data: any) {
    const { userId, captionId, comment } = data;
    const userdata = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      select: ['firstName', 'lastName'],
    });
    const { firstName, lastName } = userdata;
    const send =
      await this.sendNotificationsService.commentLikeSendNotifications({
        firstName,
        lastName,
      });
    if (!send) {
      throw new Error('Error in sending notification');
    } else {
      const result = await this.commentlikeRepository.save({
        userId: userId,
        captionId: captionId,
        comment: comment,
      });
      return 'Your comment has been successfully added';
    }
  }
}
