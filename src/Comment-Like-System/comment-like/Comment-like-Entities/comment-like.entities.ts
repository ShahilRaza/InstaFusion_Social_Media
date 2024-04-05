import { CaptionEntities } from '../../../Post-system/PostEntities/caption.entities';
import { User } from 'src/enitties/user.entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  OneToOne,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CommentReplyEntities } from './coment-reply-Entities';

@Entity({ name: 'CommentEntities' })
export class CommentEntities {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'userId' })
  userId: string;

  @Column({ name: 'captionId' })
  captionId: string;

  @CreateDateColumn({ name: 'createDateTime' })
  createDateTime: Date;

  @Column({ type: 'text' })
  comment: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'userId' })
  user?: User;

  @ManyToOne(() => CaptionEntities, (caption) => caption.comments)
  @JoinColumn({ name: 'captionId' })
  caption?: CaptionEntities;

  @OneToMany(() => CommentReplyEntities, reply => reply.comment)
  replies: CommentReplyEntities[];
}
