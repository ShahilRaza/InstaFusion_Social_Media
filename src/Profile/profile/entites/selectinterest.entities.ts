import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { UserProfile } from './user-profile.entity';

@Entity({ name: 'select_interests' })
export class selectinterests {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'profile_id', unique: true, nullable: true })
  profileId: string;

  @Column('uuid', { nullable: true })
  hobbiesId: string;

  @ManyToOne(() => UserProfile, (selectData) => selectData.selectinterestdata, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'interest_id' })
  selectData: UserProfile;
}
