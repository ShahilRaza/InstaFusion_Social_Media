import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CaptionEntities } from './caption.entities';

@Entity({ name: 'postMediaEntities' })
export class PostMediaEntities {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'postId' })
  postId: string;

  @Column()
  mediaFile: string;

  @Column()
  position: string;

  @Column({ nullable: true })
  postFilter: string

  @Column()
  longitude: number;

  @Column()
  latitude: number;

  @ManyToOne(() => CaptionEntities, (caption) => caption.PostMedia)
  @JoinColumn({ name: 'postId' })
  caption: CaptionEntities;
}
