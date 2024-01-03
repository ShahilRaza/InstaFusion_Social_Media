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
import { User } from 'src/enitties/user.entities';
import { DeviceToken } from '../../../Notification-system/notification/entities/device-token.entity';

@Entity({ name: 'Userfollow' })
export class UserFollow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.followers)
  follower: User;

  @Column({ name: 'following_id' })
  followingId: string;

  @ManyToOne(() => User, (user) => user.following)
  following: User;
  
  @Column({ name: 'follower_id' }) 
  followerId: string;

  @Column({ default: 'pending' })
  status: string;

  
}
