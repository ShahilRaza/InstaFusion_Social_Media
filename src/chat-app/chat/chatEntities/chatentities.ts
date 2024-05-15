import { User } from '../../../enitties/user.entities';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('individual_chats')
export class IndividualChatEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.senderChats)
  sender: User;

  @ManyToOne(() => User, (user) => user.recevierChats)
  receiver: User;

  @Column()
  message: string;

  @CreateDateColumn({ name: 'sent_at', type: 'timestamptz' })
  sentAt: Date;

  @Column({nullable:true})
  mediaFile: string;

  @UpdateDateColumn({ nullable: true, type: 'timestamptz' }) 
  seenAt: Date;

  @Column({ default: false })
  seenByReceiver: boolean;
}
