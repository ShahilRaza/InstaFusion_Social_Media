import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserFollow } from './entities/userfollow.entities';
import { Repository } from 'typeorm';
import { User } from '../../enitties/user.entities';
import { NotificationService } from '../../Notification-system/notification/notification.service';

@Injectable()
export class FollowService {
    constructor(@InjectRepository(UserFollow) private readonly userfollowrespository:Repository<UserFollow>,
      @InjectRepository(User ) private readonly userRepository:Repository<User>,
      private readonly notificationService: NotificationService
    ){}

    async userfollow(data) {
      // const {followerId,followingIds} =data
      // const requestExisting =await this.userfollowrespository.findOne({where:{followerId:followerId, followingId:followingIds}})
      // if (requestExisting) {
      //   return null
      // }else{
      //   const newfollow =await this.userfollowrespository.save({
      //     followingId:followingIds,
      //     followerId:followerId
      //   })
      //   if (!!newfollow) {
      //     const message = 'You have a new follower!';
      //     const registrationToken = 'The registration token of the user being followed';
      //     await this.notificationService.sendNotification(message, registrationToken);
      //   }else{
      //     throw Error('Failed to create a relationship')
      //   }
      // }
      
    }

    async followresponse(data){
     console.log(data)
    }
}

