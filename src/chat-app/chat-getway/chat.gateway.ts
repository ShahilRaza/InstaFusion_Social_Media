import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { IndividualChatsDto } from '../chat/chatDto/chat.Dto';
import { ChatService } from '../chat/chat.service';

@Injectable()
@WebSocketGateway(8001, {
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  constructor(private chatGroupService: ChatService) {}
  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('chat')
  async handleMessage(client: Socket, chat: IndividualChatsDto) {
    await this.chatGroupService.createChat(chat);
    this.server.emit(chat.receiverId, chat.message);
  }

  @SubscribeMessage('reply')
  async reply(client: Socket, chat: IndividualChatsDto) {
    await this.chatGroupService.createChat(chat);
    this.server.emit(chat.senderId, chat.message);
  }
}
