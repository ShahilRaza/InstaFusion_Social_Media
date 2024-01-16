import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as admin from 'firebase-admin';
import { Repository } from 'typeorm';
import { DeviceToken } from './entities/device-token.entity';
import { UserFollow } from '../../Follow/follow/entities/userfollow.entities';
import { Console } from 'console';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(DeviceToken)
    private readonly DeviceTokenRespository: Repository<DeviceToken>,
    @InjectRepository(UserFollow)
    private readonly userfollowrespository: Repository<UserFollow>,
  ) {}

  async registerToken(data) {
    console.log(data)
    const { senderId, token } = data;
    const followTable = await this.userfollowrespository.find({
      where: { followerId: senderId },
    });
    if (followTable && followTable.length > 0) {
      for (const followRecord of followTable) {
        const recipientId = followRecord.followingId;
        const senderIdExists = await this.DeviceTokenRespository.findOne({
          where: { senderId: senderId },
        });
        if (!senderIdExists) {
          const result = await this.DeviceTokenRespository.save({
            token: token,
            senderId: senderId,
            recipientId: recipientId,
          });
          return {
            statusCode: 201,
            message: `Successfully registered the device token`,
          }
        } else {
          throw new ConflictException(
            `DeviceToken for senderId ${senderId} already exists.`,
          );
        }
      }
    }
  }

  async sendNotification(data) {
    let result = await admin
      .messaging()
      .sendToDevice(data.fcmtoken, data.payload);
    return result;
  }

  
}
