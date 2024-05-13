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
  In,
} from 'typeorm';





@Entity({ name: 'likeEntities' })
export class LikeEntities {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'userId' })
    userId: string;
  
    @Column({ name: 'captionId' })
    captionId: string;

    @Column({ default: false }) 
    Like: boolean;

    @OneToMany(()=>User,(user)=>user.likes)
    @JoinColumn({name:'userId'})
    users : User[]

    @OneToMany(()=> CaptionEntities,(caption)=>caption.likes)
    @JoinColumn({name:"captionId"})
    captions:CaptionEntities[]
  

}