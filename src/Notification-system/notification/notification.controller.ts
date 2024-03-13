import {
  Controller,
  Post,
  Request,
  Body,
  Get,
  Req,
  UseGuards,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NotificationTokenDto } from './dto/notification-token.dto';
import { NotificationService } from './notification.service';
import * as admin from 'firebase-admin';
import { SaveTokenDto } from './dto/save-token.dto';

@ApiTags('Notifications')
@Controller('user-notification')
export class PushNotificationsController {
  constructor(private readonly notification: NotificationService) {}

  @Post('register-token')
  async registerToken(@Body() data: SaveTokenDto) {
    return await this.notification.registerToken(data);
  }

  @Get('register-token')
  async getregisterToken(@Body() data: SaveTokenDto) {
    return await this.notification.registerToken(data);
  }

  @Post('send')
  async sendNotification(@Body() data: NotificationTokenDto) {
    return await this.notification.sendNotification(data);
  }
}
