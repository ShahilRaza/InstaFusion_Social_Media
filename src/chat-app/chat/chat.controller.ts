import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';
import { IndividualChatsDto } from './chatDto/chat.Dto';


@ApiTags('Chat')
@Controller('chat')
export class ChatController {
   constructor(
    private readonly  chatService: ChatService,
   ) {}



   // @UseGuards(AuthGuard('jwt'))
   // @ApiBearerAuth('access-token')
   @Post('/create')
   async create(@Body() data:IndividualChatsDto){
    return await this.chatService.createChat(data)
   }
}
