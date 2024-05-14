import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';
import { IndividualChatsDto } from './chatDto/chat.Dto';
import { ChatRecevieRecevierDto } from './chatDto/getsenderChat.dto';


@ApiTags('Chat')
@Controller('chat')
export class ChatController {
   constructor(
    private readonly  chatService: ChatService,
   ) {}



   @UseGuards(AuthGuard('jwt'))
   @ApiBearerAuth('access-token')
   @Post('/create')
   async create(@Body() data:IndividualChatsDto){
    return await this.chatService.createChat(data)
   }




   @UseGuards(AuthGuard('jwt'))
   @ApiBearerAuth('access-token')
   @Get('retrive-chat-list:senderId')
   async getChatRecevier(@Query('senderId') data:string){
    return await this.chatService.receviechat(data)
   }



   @UseGuards(AuthGuard('jwt'))
   @ApiBearerAuth('access-token')
   @Get('retrivechat-pariticular-recevier')
   async getchatparticalrecevier(@Query() data:ChatRecevieRecevierDto){
      return await this.chatService.getChatParticular(data)
    
   }





 












}
