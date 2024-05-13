import { Module } from '@nestjs/common';
import { ChatGateway } from '../chat-getway/chat.gateway';
import { ChatModule } from '../chat/chat.module';
import { ChatService } from '../chat/chat.service';


@Module({
  imports: [ChatModule],
  providers: [],
})
export class ChatGatewayModule {}
