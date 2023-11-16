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
  JoinColumn,
} from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { column } from 'mathjs';

@Entity({ name: 'hobbies' })
export class Hobbies {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb', { nullable: true })
  music: string[];

  @Column('jsonb', { nullable: true })
  games: string[];

  @Column('jsonb', { nullable: true })
  education: string[];
}
