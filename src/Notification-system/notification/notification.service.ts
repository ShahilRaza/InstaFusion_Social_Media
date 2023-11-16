import { Injectable } from '@nestjs/common';
import { admin } from '../notification/firebase-admine.provider';

@Injectable()
export class NotificationService {
  constructor() {}

  async sendNotification(token: string, topic: string, message: string) {
    const notification = {
      notification: {
        title: 'Notification Title',
        body: message,
      },
    };
    try {
      const response = await admin.messaging().send({
        token,
      });
      return {
        success: true,
        data: response,
        message: 'Notification sent',
      };
    } catch (error) {
      return {
        success: false,
        error: error,
        message: 'Failed to send notification',
      };
    }
  }
}
