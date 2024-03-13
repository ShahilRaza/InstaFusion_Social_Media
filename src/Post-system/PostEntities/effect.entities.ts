import { column } from 'mathjs';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostEffect } from './posteffect.entities';

@Entity({ name: 'Effect' })
export class effectEntities {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  effectName: string;

  @OneToMany(() => PostEffect, (posteffects) => posteffects.effect)
  postEffects: PostEffect[];
}
