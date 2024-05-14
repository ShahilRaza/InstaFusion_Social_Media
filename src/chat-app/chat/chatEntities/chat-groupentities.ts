import { User } from '../../../enitties/user.entities';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';



@Entity('chat_groups')
export class createGroupsEntities {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ nullable: true })
    profileUrl: string;
  
    @Column()
    name: string;
  
    @Column({ nullable: true })
    description: string;
  
    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    'created_at': Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    'updated_at': Date
}