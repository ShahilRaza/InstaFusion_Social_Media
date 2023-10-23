import { Injectable } from '@nestjs/common';
import { admin } from '../notification/firebase-admine.provider';

@Injectable()
export class NotificationService {
    constructor() {}

    async sendNotification(token: string, topic: string, message: string) {
      // const notification = {
      //   notification: {
      //     title: 'Notification Title',
      //     body: message,
      //   },
      // };
      // try {
      //   const response = await admin.messaging().send({
      //     token: token,
      //     topic: topic,
      //     //data: notification,
      //   });
      //   console.log('Successfully sent FCM message:', response);
      // } catch (error) {
      //   console.error('Error sending FCM message:', error);
      // }
    }
}