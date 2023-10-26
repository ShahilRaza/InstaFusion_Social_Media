import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, Unique, OneToOne, BeforeInsert, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/enitties/user.entities';


@Entity({ name: 'Userfollow' })
export class UserFollow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.followers)
  // @JoinColumn({ name: 'follower_id' })
  follower: User;
  @Column({ name: 'follower_id' })
  followerId: string;

  @ManyToOne(() => User, (user) => user.following)
  // @JoinColumn({ name: 'followering_id',  })
  following: User;
  @Column({ name: 'following_id' })
  followingId: string;
  
  @Column({ default: 'unfollow' })
  status: string;
}