import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags ,ApiConsumes, ApiBody} from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';
import { IndividualChatsDto } from './chatDto/chat.Dto';
import { ChatRecevieRecevierDto } from './chatDto/getsenderChat.dto';
import { MessageSeenDto } from './chatDto/messagseen.dto';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileSendDto } from './chatDto/sendfile.dto';


@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Post('/create')
  async create(@Body() data: IndividualChatsDto) {
    return await this.chatService.createChat(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Get('retrive-chat-list:senderId')
  async getChatRecevier(@Query('senderId') data: string) {
    return await this.chatService.receviechat(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Get('retrivechat-pariticular-recevier')
  async getchatparticalrecevier(@Query() data: ChatRecevieRecevierDto) {
    return await this.chatService.getChatParticular(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Put('messsage-seen')
  async messageSeen(@Body() data: MessageSeenDto) {
    return await this.chatService.messagSeen(data);
  }


  @Post('/uploadfilechat')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'files', maxCount: 10 }, 
  ]))
  @ApiBody({ type: FileSendDto })
  uploadFile(@UploadedFiles() files: { files?: Express.Multer.File[] }, @Body() data: FileSendDto) {
    if (files.files) {
      files.files.forEach((fileItem) => {
        if (fileItem.size > Number(process.env.FILE_SIZE)) {
          throw new BadRequestException('File Size Should not be Greater than 2 MB');
        }
      });
    } else {
      throw new BadRequestException('No files uploaded');
    }
    return this.chatService.uploadFile({ files: files.files, data });
  }


}
