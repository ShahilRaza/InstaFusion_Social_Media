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

@Entity({ name: 'CaptionEntities' })
export class CaptionEntities {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'createdDatetime', default: () => 'CURRENT_TIMESTAMP' }) // Set default value to CURRENT_TIMESTAMP
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
}
