import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CaptionEntities } from './caption.entities';

@Entity({ name: 'postTypeEntities' })
export class PostType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'post_typeName' })
  postTypeName: string;

  @OneToMany(() => CaptionEntities, (captions) => captions.postType)
  captions: CaptionEntities[];
}
