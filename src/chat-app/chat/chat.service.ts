import { HttpException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IndividualChatEntity } from './chatEntities/chatentities';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(IndividualChatEntity)
        private readonly chatRepository: Repository<IndividualChatEntity>,
    ){}

    async   createChat(data:any){
        const {senderId, receiverId, message} = data;
        const result=await this.chatRepository.save({
            sender: senderId,
            receiver:receiverId ,
            message:message 
        })
        if (!result) {
            throw new InternalServerErrorException();
        }
        return result;
    }
}
