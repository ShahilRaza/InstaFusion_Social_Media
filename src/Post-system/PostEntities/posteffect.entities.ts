import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { effectEntities } from './effect.entities';

@Entity({ name: 'PostEffect' })
export class PostEffect {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'effect_id' })
  effectId: string;

  @Column()
  scale: string;

  @ManyToOne(() => effectEntities, (effect) => effect.postEffects)
  @JoinColumn({ name: 'effect_id' })
  effect?: effectEntities;
}
