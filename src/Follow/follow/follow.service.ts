import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserFollow } from './entities/userfollow.entities';
import { Repository } from 'typeorm';
import { User } from '../../enitties/user.entities';
import { NotificationService } from '../../Notification-system/notification/notification.service';
import { asyncScheduler } from 'rxjs';
import { error } from 'console';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(UserFollow)
    private readonly userfollowrespository: Repository<UserFollow>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly notificationService: NotificationService,
  ) {}

  async userfollow(data) {
    const { followerId, followingIds, token: userToken } = data;
    const requestExisting = await this.userfollowrespository.findOne({
      where: { followerId: followerId, followingId: followingIds },
    });
    if (!requestExisting) {
      await this.userfollowrespository.save({
        followerId: followerId,
        followingId: followingIds,
      });
      await this.notificationService.sendNotification(
        userToken,
        'Follow',
        'You have new followers',
      );
    } else {
      throw new HttpException(
        'Already sent request Following',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async followResponse(data) {
    const { followerId, followingId, status } = data;
    const userfollow = await this.userfollowrespository.findOne({
      where: {
        followerId: followerId,
        followingId: followingId,
      },
    });
    const result = await this.userfollowrespository.update(
      {
        followerId: userfollow.followerId,
        followingId: userfollow.followingId,
      },
      { status: status },
    );
    let message;
    switch (status) {
      case 'accept':
        message = 'Accepted your request';
        break;
      case 'pending':
        message = 'pending your request';
        break;
      default:
        message = 'Reject your request';
    }
    return {
      message: message,
    };
  }
}
