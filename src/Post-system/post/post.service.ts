import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaptionEntities } from '../PostEntities/caption.entities';
import { Repository } from 'typeorm';
import { User } from '../../enitties/user.entities';
import { PostType } from '../PostEntities/PostType.entities';
import { Console } from 'console';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(CaptionEntities)
    private readonly CaptionRepository: Repository<CaptionEntities>,
    @InjectRepository(PostType)
    private readonly PostTypeRepository: Repository<PostType>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createpostype(data: any) {
    const { postTypeName } = data;
    const result = await this.PostTypeRepository.save({
      postTypeName: postTypeName,
    });
    if (!result) {
      throw new Error('Error while creating postType');
    }
    return result;
  }

  async createcaption(data: any) {
    const { caption, userId, postTypeId } = data;
    const result = await this.CaptionRepository.save({
      caption: caption,
      createdByUserId: userId,
      postTypeId: postTypeId,
    });
    if (!result) {
      throw new Error('Error while creating caption');
    }
    return result;
  }
}
