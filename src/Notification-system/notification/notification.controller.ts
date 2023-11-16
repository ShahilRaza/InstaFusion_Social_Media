import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly NotificationService: NotificationService) {}

  @Post('send')
  async sendNotification(@Body() data: any) {}
}
