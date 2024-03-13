import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { CaptionEntities } from '../PostEntities/caption.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostMediaEntities } from '../PostEntities/postmedia.entities';
import { PostEffect } from '../PostEntities/posteffect.entities';
import { effectEntities } from '../PostEntities/effect.entities';
import { PostType } from '../PostEntities/PostType.entities';
import { User } from '../../enitties/user.entities';

@Module({
   imports:[ TypeOrmModule.forFeature([
      CaptionEntities,
      PostMediaEntities,
      PostEffect,
      effectEntities,
      PostType,
      User 
   ]),],
   controllers:[PostController],
   providers:[PostService],
   exports:[]
})
export class PostModule {}
