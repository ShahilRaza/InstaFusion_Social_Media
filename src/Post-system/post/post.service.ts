import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaptionEntities } from '../PostEntities/caption.entities';
import { Repository } from 'typeorm';
import { User } from '../../enitties/user.entities';
import { PostType } from '../PostEntities/PostType.entities';
import { Console } from 'console';
import { GoogleDriveService } from '../../googledrivestorage.service';
import { PostMediaEntities } from '../PostEntities/postmedia.entities';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(CaptionEntities)
    private readonly CaptionRepository: Repository<CaptionEntities>,
    @InjectRepository(PostType)
    private readonly PostTypeRepository: Repository<PostType>,
    @InjectRepository(PostMediaEntities)
    private readonly PostMediaRepository: Repository<PostMediaEntities>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly googleDriveService: GoogleDriveService,
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

  async createmedia(mediadata: any) {
    const { data, mediaFiles } = mediadata;
    const media = [];
    try {
      for (const filesItms of mediaFiles) {
        let fileurls = await this.googleDriveService.uploadFile(filesItms);
        const savaadata = await this.PostMediaRepository.save({
          mediaFile: fileurls,
          postId: data.captionId,
          position: data.position,
          longitude: data.longitude,
          latitude: data.latitude,
        });
        media.push(savaadata);
      }
      return media;
    } catch (error) {
      console.log(error);
    }
  }

  async getallpostype(id: any) {
    const postdata = await this.PostTypeRepository.findOne({
      where: {
        id: id,
      },
      relations: ['captions', 'captions.PostMedia'],
    });
    if (!postdata) {
      throw new NotFoundException(`${id}  is not found`);
    }
    return postdata;
  }

  async updatecaptions(data: any) {
    var { postTypeId, caption } = data;
    const result = await this.PostTypeRepository.findOne({
      where: {
        id: postTypeId,
      },
      relations: ['captions'],
    });
    if (!result) {
      throw new NotFoundException('Post Type does');
    }
    if (result.captions.length > 0) {
      for (const mediaFilesItems of result.captions) {
        const UpadatCaption = await this.CaptionRepository.update(
          mediaFilesItems.id,
          { caption },
        );
        if (UpadatCaption.affected == 1) {
          return `successfully updated capti`;
        } else {
          return `unable to update caption`;
        }
      }
    }
  }
}
