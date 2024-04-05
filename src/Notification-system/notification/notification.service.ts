import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as admin from 'firebase-admin';
import { Repository } from 'typeorm';
import { DeviceToken } from './entities/device-token.entity';
import { UserFollow } from '../../Follow/follow/entities/userfollow.entities';
import { Console } from 'console';
//import {  TwilioService } from 'nestjs-twilio';
import * as twilio from 'twilio';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(DeviceToken)
    private readonly DeviceTokenRespository: Repository<DeviceToken>,
    @InjectRepository(UserFollow)
    private readonly userfollowrespository: Repository<UserFollow>,
  ) {}

  async registerToken(data) {
    console.log(data);
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
          };
        } else {
          throw new ConflictException(
            `DeviceToken for senderId ${senderId} already exists.`,
          );
        }
      }
    }
  }

  async sendNotification(data: any) {
    try {
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN,
      );
      const message = await client.messages.create({
        body: `this user want to be follow ${data}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: '+917505234970',
      });
      return message;
    } catch (error) {
      throw error;
    }
  }

  async sendResponseNotification(data: any) {
    const { firstName, lastName } = data;
    try {
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN,
      );
      const message = await client.messages.create({
        body: `this user start following  ${firstName} ${lastName}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: '+917505234970',
      });
      return message;
    } catch (error) {
      throw error;
    }
  }

  async commentLikeSendNotifications(data: any) {
    const { firstName, lastName } = data;
    try {
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN,
      );
      const message = await client.messages.create({
        body: `${firstName} ${lastName} Comment your Post `,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: '+917505234970',
      });
      return message;
    } catch (error) {
      throw error;
    }
  }


  async commentReplySendNotifications(data: any) {
    const { firstName, lastName } = data;
    try {
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN,
      );
      const message = await client.messages.create({
        body: `${firstName} ${lastName} Reply your  Comment `,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: '+917505234970',
      });
      return message;
    } catch (error) {
      throw error;
    }
  }



}
