import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndividualChatEntity } from './chatEntities/chatentities';
import { User } from '../../enitties/user.entities';
import { ChatController } from './chat.controller';
import { createGroupsEntities } from './chatEntities/chat-groupentities';
import { GoogleDriveService } from '../../googledrivestorage.service';

@Module({
  imports:[TypeOrmModule.forFeature([IndividualChatEntity,createGroupsEntities])],
  controllers:[ ChatController],
  providers: [ChatService,GoogleDriveService],
  exports:[ChatService]
})
export class ChatModule {}
