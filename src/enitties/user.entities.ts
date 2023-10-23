import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, Unique, OneToOne, BeforeInsert, JoinColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { UserProfile } from '../Profile/profile/entites/user-profile.entity';
import { userprofileDto } from 'src/Profile/profile/profileDto/userprofile.dto';
import { UserFollow } from 'src/Follow/follow/entities/userfollow.entities';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({unique:true})
  email: string;

  @Column()
  password: string;


  @Column( {nullable: false} )
  token: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isVerified: boolean;

  @OneToMany(() => UserFollow, (userFollow) => userFollow.follower)
  followers: UserFollow[];

  @OneToMany(() => UserFollow, (userFollow) => userFollow.following)
  following: UserFollow[];

  @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;

  @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;
}