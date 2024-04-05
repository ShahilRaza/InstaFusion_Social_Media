import { DEFAULT_FACTORY_CLASS_METHOD_KEY } from '@nestjs/common/module-utils/constants';
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
import { CommentEntities } from './comment-like.entities';


@Entity({name:'CommentReplyEntities'})
export class CommentReplyEntities{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    captionId:string 
   

    @Column()
    commentId:string

    @Column({type: "text",nullable:false })
    reply:string

    @Column()
    userId:string
    
    @ManyToOne(() => CommentEntities, comment => comment.replies)
    @JoinColumn({ name: 'commentId' })
    comment: CommentEntities;

}