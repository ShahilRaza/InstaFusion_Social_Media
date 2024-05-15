import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IndividualChatEntity } from './chatEntities/chatentities';
import { In, Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(IndividualChatEntity)
    private readonly chatRepository: Repository<IndividualChatEntity>,
  ) {}

  async createChat(data: any) {
    const { senderId, receiverId, message } = data;
    const result = await this.chatRepository.save({
      sender: senderId,
      receiver: receiverId,
      message: message,
    });
    if (!result) {
      throw new InternalServerErrorException();
    }
    return result;
  }

  async receviechat(data: any) {
    const result = await this.chatRepository
      .createQueryBuilder('individual_chats')
      .where(
        'individual_chats.sender =:data  OR individual_chats.receiver = :data',
        { data },
      )
      .orderBy('individual_chats.sentAt', 'DESC')
      .getMany();
    if (result.length > 0) {
      const mge = result.map((chat) => {
        return {
          message: chat.message,
          sentAt: chat.sentAt,
        };
      });
      return mge;
    }
  }

  async getChatParticular(data: any) {
    const { senderId, receiverId } = data;
    const message = await this.chatRepository.find({
      where: { sender: { id: senderId }, receiver: { id: receiverId } },
      order: { sentAt: 'DESC' },
    });
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }

  async messagSeen(data: any) {
    const {messageId}=data
    const updateResult = await this.chatRepository.update(
        { id: In(messageId) }, 
        { seenByReceiver: true} ,
    );
    if (updateResult.affected === 0) {
        throw new NotFoundException('No messages found to update');
    }
    return updateResult; 
  }



}
