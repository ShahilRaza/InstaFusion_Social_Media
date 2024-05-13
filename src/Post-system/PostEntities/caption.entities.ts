import { User } from 'src/enitties/user.entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostMediaEntities } from './postmedia.entities';
import { PostType } from './PostType.entities';
import { CommentEntities } from '../../Comment-Like-System/comment-like/Comment-like-Entities/comment-like.entities';
import { LikeEntities } from '../../Comment-Like-System/comment-like/Comment-like-Entities/like-entities';

@Entity({ name: 'CaptionEntities' })
export class CaptionEntities {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'createdDatetime', default: () => 'CURRENT_TIMESTAMP' }) 
  createdDatetime: Date;

  @Column({ name: 'createdByUserId' })
  createdByUserId: string;

  @Column()
  caption: string;

  @ManyToOne(() => User, (user) => user.captions)
  @JoinColumn({ name: 'createdByUserId' })
  creator: User;

  @OneToMany(() => PostMediaEntities, (PostMedia) => PostMedia.caption)
  PostMedia: PostMediaEntities[];

  @Column({ name: 'postTypeId' })
  postTypeId: string;

  @ManyToOne(() => PostType, (postType) => postType.captions)
  @JoinColumn({ name: 'postTypeId' })
  postType: PostType;

  @ManyToOne(()=>  CommentEntities , comment=>comment)
  comments?:CommentEntities

  @ManyToOne(()=> LikeEntities,(like)=>like.captions)
  likes?:LikeEntities
}
