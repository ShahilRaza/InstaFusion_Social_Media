import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndividualChatEntity } from './chatEntities/chatentities';
import { User } from '../../enitties/user.entities';
import { ChatController } from './chat.controller';

@Module({
  imports:[TypeOrmModule.forFeature([IndividualChatEntity])],
  controllers:[ ChatController],
  providers: [ChatService]
})
export class ChatModule {}
